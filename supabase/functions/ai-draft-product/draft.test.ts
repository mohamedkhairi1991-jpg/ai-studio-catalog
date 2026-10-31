import { describe, expect, it } from 'vitest';
import {
  buildUserPrompt,
  candidateText,
  draftWarnings,
  extractJsonObject,
  groundingSources,
  normalizeDraft,
  searchSuggestionsHtml,
  validateRequest,
} from './draft.ts';

describe('validateRequest', () => {
  it('requires a product name', () => {
    expect(validateRequest({})).toEqual({ ok: false, message: 'productName is required.' });
    expect(validateRequest(null).ok).toBe(false);
  });

  it('trims and keeps optional fields only when present', () => {
    expect(validateRequest({ productName: '  Forxiga 10 mg ', companyName: ' ' })).toEqual({
      ok: true,
      value: { productName: 'Forxiga 10 mg' },
    });
  });

  it('rejects oversized input', () => {
    expect(validateRequest({ productName: 'x'.repeat(201) }).ok).toBe(false);
    expect(validateRequest({ productName: 'a', extraContext: 'x'.repeat(6001) }).ok).toBe(false);
  });
});

describe('buildUserPrompt', () => {
  it('includes company and context when given', () => {
    const p = buildUserPrompt({ productName: 'Crestor 20 mg', companyName: 'AstraZeneca', extraContext: 'pack 28' });
    expect(p).toContain('Product: Crestor 20 mg');
    expect(p).toContain('AstraZeneca');
    expect(p).toContain('pack 28');
  });
});

describe('extractJsonObject', () => {
  it('reads fenced JSON with surrounding text', () => {
    expect(extractJsonObject('Here:\n```json\n{"found": true, "brandName": "X"}\n```\nDone')).toEqual({
      found: true,
      brandName: 'X',
    });
  });

  it('reads bare JSON', () => {
    expect(extractJsonObject('{"a":1}')).toEqual({ a: 1 });
  });

  it('throws when there is no object', () => {
    expect(() => extractJsonObject('sorry, no idea')).toThrow();
  });
});

describe('normalizeDraft', () => {
  it('cleans values, drops bad sources and falls back to the generic as ingredient', () => {
    const d = normalizeDraft(
      {
        brandName: '  Forxiga  10 mg ',
        category: 'prescription_drug',
        genericName: 'Dapagliflozin',
        activeIngredients: [],
        drugClass: 'SGLT2 inhibitors',
        specialties: ['Endocrinology', 'endocrinology', 'Cardiology', 42],
        sources: [
          { title: 'EMA', url: 'https://www.ema.europa.eu/x' },
          { title: 'bad', url: 'javascript:alert(1)' },
          { title: 'dup', url: 'https://www.ema.europa.eu/x' },
        ],
        clinical: { usualAdultDose: '10 mg once daily' },
      },
      'Forxiga',
    );
    expect(d.brandName).toBe('Forxiga 10 mg');
    expect(d.activeIngredients).toEqual(['Dapagliflozin']);
    expect(d.specialties).toEqual(['Endocrinology', 'Cardiology']);
    expect(d.sources).toEqual([{ title: 'EMA', url: 'https://www.ema.europa.eu/x' }]);
    expect(d.clinical.usualAdultDose).toBe('10 mg once daily');
    expect(d.clinical.contraindications).toBe('');
    expect(d.found).toBe(true);
  });

  it('rejects unknown categories and removes the generic for supplements', () => {
    expect(normalizeDraft({ category: 'medical_device' }, 'X').category).toBeNull();
    const s = normalizeDraft({ category: 'dietary_supplement', genericName: 'Vitamin D' }, 'X');
    expect(s.genericName).toBeNull();
    expect(s.activeIngredients).toEqual([]);
  });

  it('survives garbage input', () => {
    const d = normalizeDraft('nonsense', 'Fallback');
    expect(d.brandName).toBe('Fallback');
    expect(d.category).toBeNull();
  });

  it('caps long text', () => {
    const d = normalizeDraft({ clinical: { approvedIndications: 'x'.repeat(5000) } }, 'X');
    expect(d.clinical.approvedIndications.length).toBe(3000);
  });
});

describe('draftWarnings', () => {
  it('lists every missing publish requirement and always mentions registration', () => {
    const w = draftWarnings(normalizeDraft({ found: false }, 'X'), 0);
    expect(w[0]).toContain('could not confirm');
    expect(w.join(' ')).toContain('No sources');
    expect(w.join(' ')).toContain('Usual adult dose is missing');
    expect(w[w.length - 1]).toContain('registration number');
  });
});

describe('Gemini response helpers', () => {
  const response = {
    candidates: [
      {
        content: { parts: [{ text: '{"a":' }, { text: '1}' }] },
        groundingMetadata: {
          groundingChunks: [
            { web: { uri: 'https://vertexaisearch.cloud.google.com/r/1', title: 'ema.europa.eu' } },
            { web: { uri: 'not a url' } },
          ],
          searchEntryPoint: { renderedContent: '<div>chips</div>' },
        },
      },
    ],
  };

  it('joins candidate text parts', () => {
    expect(candidateText(response)).toBe('{"a":1}');
    expect(candidateText({})).toBe('');
  });

  it('extracts grounding sources and search suggestions', () => {
    const meta = response.candidates[0].groundingMetadata;
    expect(groundingSources(meta)).toEqual([
      { title: 'ema.europa.eu', url: 'https://vertexaisearch.cloud.google.com/r/1' },
    ]);
    expect(searchSuggestionsHtml(meta)).toBe('<div>chips</div>');
    expect(groundingSources(undefined)).toEqual([]);
  });
});
