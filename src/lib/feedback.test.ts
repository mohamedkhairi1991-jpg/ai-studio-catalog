import { describe, expect, it } from 'vitest';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  formatCheckedLine,
  loadDrugSources,
  reportDrugError,
  requestMissingDrug,
} from './feedback';

type Call = { fn: string; args: Record<string, unknown> };

function rpcClient(calls: Call[], result: unknown) {
  return {
    rpc: async (fn: string, args: Record<string, unknown>) => {
      calls.push({ fn, args });
      return { data: result, error: null };
    },
  } as unknown as SupabaseClient;
}

describe('reportDrugError', () => {
  it('sends trimmed text and refuses an empty message', async () => {
    const calls: Call[] = [];
    expect(
      await reportDrugError(rpcClient(calls, 'x'), { productId: 'p1', topic: 'dose', message: '  ' })
    ).toEqual({ ok: false, message: 'Please describe the error.' });
    expect(calls).toEqual([]);

    expect(
      await reportDrugError(rpcClient(calls, 'f1'), {
        productId: 'p1',
        topic: 'dose',
        message: ' Twice daily ',
      })
    ).toEqual({ ok: true, data: 'f1' });
    expect(calls).toEqual([
      {
        fn: 'report_drug_error',
        args: { p_product_id: 'p1', p_topic: 'dose', p_message: 'Twice daily' },
      },
    ]);
  });
});

describe('requestMissingDrug', () => {
  it('needs a name and sends empty extras as null', async () => {
    const calls: Call[] = [];
    expect(await requestMissingDrug(rpcClient(calls, 'x'), { drugName: ' a ' })).toEqual({
      ok: false,
      message: 'Please write the drug name.',
    });
    expect(
      await requestMissingDrug(rpcClient(calls, 'f2'), { drugName: ' Missingol 5 mg ', companyName: ' ' })
    ).toEqual({ ok: true, data: 'f2' });
    expect(calls).toEqual([
      {
        fn: 'request_missing_drug',
        args: { p_drug_name: 'Missingol 5 mg', p_company_name: null, p_message: null },
      },
    ]);
  });
});

describe('loadDrugSources', () => {
  it('keeps only https sources', async () => {
    const res = await loadDrugSources(
      rpcClient([], {
        checked_at: '2026-11-07T10:00:00Z',
        sources: [
          { title: 'Label', url: 'https://example.com/a.pdf' },
          { title: 'Bad', url: 'javascript:alert(1)' },
        ],
      }),
      'p1'
    );
    expect(res).toEqual({
      ok: true,
      data: {
        checkedAt: '2026-11-07T10:00:00Z',
        sources: [{ title: 'Label', url: 'https://example.com/a.pdf' }],
      },
    });
  });
});

describe('formatCheckedLine', () => {
  it('formats the checked date', () => {
    expect(formatCheckedLine('2026-11-07T10:00:00Z')).toBe('Checked by Pharmaty on 7 Nov 2026');
    expect(formatCheckedLine(null)).toBeNull();
  });
});
