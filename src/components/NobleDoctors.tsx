import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  AlertTriangle,
  Award,
  BookOpen,
  ChevronRight,
  Eye,
  EyeOff,
  ImagePlus,
  Lightbulb,
  MoreHorizontal,
  Pencil,
  Pill,
  Pin,
  Plus,
  Search,
  Stethoscope,
  Trash2,
  X,
} from 'lucide-react';
import { searchCatalogProducts, type DoctorSearchRow } from '../lib/catalog';
import { isOffline } from '../lib/offlineCatalog';
import {
  NOBLE_DISCLAIMER,
  NOBLE_MAX_DRUGS,
  NOBLE_MAX_IMAGES,
  NOBLE_TOPIC_LABELS,
  adminHideNoblePost,
  adminSearchDoctors,
  adminSetNobleDoctor,
  deleteNoblePost,
  loadMyNobleStatus,
  loadNobleDoctorPage,
  loadNobleDoctors,
  loadNobleFeed,
  loadNobleSpecialties,
  loadProductNobleNotes,
  nobleAvatarUrl,
  nobleImageUrl,
  saveNoblePost,
  updateMyNobleProfile,
  uploadNobleImage,
  type AdminDoctorRow,
  type NobleDoctor,
  type NobleDoctorPage,
  type NoblePost,
  type NobleSpecialty,
  type NobleTopic,
} from '../lib/nobleDoctors';
import { buttonClass, inputClass, secondaryButtonClass } from './ui';

// ---------------------------------------------------------------------------
// Small pieces

const backButtonClass =
  'h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-surface hover:bg-surface-raised text-sm font-medium text-text transition-colors duration-150';

function initialsOf(name: string): string {
  const parts = name.replace(/^dr\.?\s+/i, '').trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? 'D') + (parts[1]?.[0] ?? '')).toUpperCase();
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

function DoctorAvatar({
  client,
  doctor,
  size = 'md',
}: {
  client: SupabaseClient;
  doctor: NobleDoctor;
  size?: 'sm' | 'md' | 'lg';
}) {
  const [broken, setBroken] = useState(false);
  const url = nobleAvatarUrl(client, doctor);
  const box = size === 'lg' ? 'w-20 h-20 text-xl' : size === 'sm' ? 'w-9 h-9 text-xs' : 'w-12 h-12 text-sm';
  return url && !broken ? (
    <img
      src={url}
      alt=""
      onError={() => setBroken(true)}
      className={`${box} rounded-full object-cover border border-border shrink-0 bg-surface-raised`}
    />
  ) : (
    <div
      aria-hidden="true"
      className={`${box} rounded-full shrink-0 inline-flex items-center justify-center font-semibold bg-primary/25 text-accent border border-accent/30`}
    >
      {initialsOf(doctor.fullName)}
    </div>
  );
}

const TOPIC_ICON: Record<NobleTopic, typeof Lightbulb> = {
  tip: Lightbulb,
  approach: Stethoscope,
  case: BookOpen,
  warning: AlertTriangle,
};

function TopicBadge({ topic }: { topic: NobleTopic }) {
  const Icon = TOPIC_ICON[topic];
  const tone =
    topic === 'warning'
      ? 'border-[#F59E0B]/40 text-[#F59E0B] bg-[#F59E0B]/10'
      : 'border-accent/30 text-accent bg-primary/15';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone}`}>
      <Icon className="w-3 h-3" aria-hidden="true" />
      {NOBLE_TOPIC_LABELS[topic]}
    </span>
  );
}

function Banner({ tone, children }: { tone: 'error' | 'info'; children: React.ReactNode }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`rounded-xl border px-3.5 py-2.5 text-sm ${
        tone === 'error' ? 'border-danger/40 bg-danger/10 text-danger' : 'border-border bg-surface text-text-muted'
      }`}
    >
      {children}
    </div>
  );
}

function ImageViewer({ url, onClose }: { url: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div
      role="dialog"
      aria-label="Picture"
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close picture"
        onClick={onClose}
        className="absolute top-3 right-3 h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/10 text-white"
      >
        <X className="w-5 h-5" aria-hidden="true" />
      </button>
      <img src={url} alt="" className="max-h-full max-w-full object-contain rounded-lg" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// One post

export function NoblePostCard({
  client,
  post,
  showAuthor = false,
  canManage = false,
  isAdmin = false,
  onEdit,
  onDeleted,
  onHiddenChange,
  onOpenProduct,
  onOpenDoctor,
}: {
  client: SupabaseClient;
  post: NoblePost;
  showAuthor?: boolean;
  canManage?: boolean;
  isAdmin?: boolean;
  onEdit?: (post: NoblePost) => void;
  onDeleted?: (postId: string) => void;
  onHiddenChange?: (postId: string, hidden: boolean) => void;
  onOpenProduct?: (productId: string) => void;
  onOpenDoctor?: (profileId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewer, setViewer] = useState<string | null>(null);
  const long = post.body.length > 420 || post.body.split('\n').length > 8;

  const closeMenu = () => {
    setMenuOpen(false);
    setConfirmDelete(false);
  };

  const remove = async () => {
    setBusy(true);
    const res = await deleteNoblePost(client, post.id);
    setBusy(false);
    closeMenu();
    if (!res.ok) setError(res.message);
    else onDeleted?.(post.id);
  };

  const toggleHidden = async () => {
    setBusy(true);
    const res = await adminHideNoblePost(client, post.id, !post.isHidden);
    setBusy(false);
    closeMenu();
    if (!res.ok) setError(res.message);
    else onHiddenChange?.(post.id, !post.isHidden);
  };

  const showMenu = canManage || isAdmin;

  return (
    <article
      className={`relative rounded-2xl border bg-surface p-4 space-y-3 ${
        post.isHidden ? 'border-danger/40 opacity-80' : post.isPinned ? 'border-accent/40' : 'border-border'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-1.5">
          {showAuthor && post.author && (
            <button
              type="button"
              onClick={() => onOpenDoctor?.(post.author!.profileId)}
              className="flex items-center gap-2.5 text-left group"
            >
              <DoctorAvatar client={client} doctor={post.author} size="sm" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-text group-hover:text-accent truncate">
                  {post.author.fullName}
                </span>
                <span className="block text-[11px] text-text-muted truncate">
                  {[post.author.title, post.author.specialtyName].filter(Boolean).join(' · ')}
                </span>
              </span>
            </button>
          )}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-text-muted">
            <TopicBadge topic={post.topic} />
            {post.isPinned && (
              <span className="inline-flex items-center gap-1 text-accent font-medium">
                <Pin className="w-3 h-3" aria-hidden="true" />
                Pinned
              </span>
            )}
            {post.isHidden && (
              <span className="inline-flex items-center gap-1 text-danger font-medium">
                <EyeOff className="w-3 h-3" aria-hidden="true" />
                Hidden by admin
              </span>
            )}
            <span>{formatDate(post.createdAt)}</span>
          </div>
          {post.title && <h3 className="text-base font-semibold text-text leading-snug">{post.title}</h3>}
        </div>

        {showMenu && (
          <div className="relative shrink-0 -mr-1.5 -mt-1">
            <button
              type="button"
              aria-label="Post options"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => {
                setConfirmDelete(false);
                setMenuOpen((v) => !v);
              }}
              className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-surface-raised"
            >
              <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-30" aria-hidden="true" onClick={closeMenu} />
                <div role="menu" className="absolute right-0 top-9 z-40 w-48 rounded-xl border border-border bg-surface shadow-lg p-1">
                  {confirmDelete ? (
                    <div className="p-2 space-y-2">
                      <p className="text-xs text-text">Delete this post?</p>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          role="menuitem"
                          disabled={busy}
                          onClick={() => void remove()}
                          className="flex-1 rounded-lg bg-danger/90 hover:bg-danger text-white text-xs font-semibold py-1.5 disabled:opacity-60"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => setConfirmDelete(false)}
                          className="flex-1 rounded-lg border border-border text-text-muted hover:text-text text-xs font-medium py-1.5"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {canManage && (
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            closeMenu();
                            onEdit?.(post);
                          }}
                          className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-text hover:bg-surface-raised"
                        >
                          <Pencil className="w-4 h-4 text-text-muted" aria-hidden="true" />
                          Edit
                        </button>
                      )}
                      {isAdmin && (
                        <button
                          type="button"
                          role="menuitem"
                          disabled={busy}
                          onClick={() => void toggleHidden()}
                          className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-text hover:bg-surface-raised"
                        >
                          {post.isHidden ? (
                            <Eye className="w-4 h-4 text-text-muted" aria-hidden="true" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-text-muted" aria-hidden="true" />
                          )}
                          {post.isHidden ? 'Show to doctors' : 'Hide from doctors'}
                        </button>
                      )}
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => setConfirmDelete(true)}
                        className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-danger hover:bg-surface-raised"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="relative">
        <p
          className={`text-sm text-text leading-relaxed whitespace-pre-line break-words ${
            long && !expanded ? 'max-h-48 overflow-hidden' : ''
          }`}
        >
          {post.body}
        </p>
        {long && !expanded && (
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
        )}
      </div>
      {long && (
        <button type="button" onClick={() => setExpanded((v) => !v)} className="text-xs font-medium text-accent hover:underline">
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}

      {post.images.length > 0 && (
        <div className={`grid gap-1.5 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'}`}>
          {post.images.map((path, i) => {
            const url = nobleImageUrl(client, path);
            return (
              <button
                key={path}
                type="button"
                aria-label={`Open picture ${i + 1}`}
                onClick={() => setViewer(url)}
                className={`overflow-hidden rounded-xl border border-border bg-surface-raised ${
                  post.images.length === 1 ? 'max-h-96' : 'aspect-square'
                }`}
              >
                <img src={url} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            );
          })}
        </div>
      )}

      {post.drugs.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.drugs.map((d) => (
            <button
              key={d.productId}
              type="button"
              onClick={() => onOpenProduct?.(d.productId)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-raised/60 px-2.5 py-1 text-xs font-medium text-accent hover:border-accent"
            >
              <Pill className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="truncate max-w-[14rem]">{d.brandName}</span>
            </button>
          ))}
        </div>
      )}

      <p className="text-[11px] text-text-muted border-t border-border/70 pt-2">{NOBLE_DISCLAIMER}</p>
      {error && <p className="text-xs text-danger">{error}</p>}
      {viewer && <ImageViewer url={viewer} onClose={() => setViewer(null)} />}
    </article>
  );
}

// ---------------------------------------------------------------------------
// Writing a post

export function NoblePostComposer({
  client,
  initial,
  onSaved,
  onCancel,
}: {
  client: SupabaseClient;
  initial?: NoblePost | null;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [body, setBody] = useState(initial?.body ?? '');
  const [topic, setTopic] = useState<NobleTopic>(initial?.topic ?? 'tip');
  const [pinned, setPinned] = useState(initial?.isPinned ?? false);
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [drugs, setDrugs] = useState<Array<{ productId: string; brandName: string }>>(initial?.drugs ?? []);
  const [drugQuery, setDrugQuery] = useState('');
  const [drugResults, setDrugResults] = useState<DoctorSearchRow[]>([]);
  const [uploading, setUploading] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = drugQuery.trim();
    if (q.length < 2) {
      setDrugResults([]);
      return;
    }
    let active = true;
    const t = window.setTimeout(() => {
      void searchCatalogProducts(client, { query: q, limit: 8 }).then((res) => {
        if (active && res.ok) setDrugResults(res.data.rows);
      });
    }, 300);
    return () => {
      active = false;
      window.clearTimeout(t);
    };
  }, [client, drugQuery]);

  const onPickImages = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, NOBLE_MAX_IMAGES - images.length);
    e.target.value = '';
    if (files.length === 0) return;
    setError(null);
    setUploading((n) => n + files.length);
    for (const file of files) {
      const res = await uploadNobleImage(client, file);
      setUploading((n) => n - 1);
      if (res.ok) setImages((prev) => [...prev, res.data].slice(0, NOBLE_MAX_IMAGES));
      else setError(res.message);
    }
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    const res = await saveNoblePost(client, {
      id: initial?.id ?? null,
      title,
      body,
      topic,
      pinned,
      productIds: drugs.map((d) => d.productId),
      imagePaths: images,
    });
    setSaving(false);
    if (!res.ok) setError(res.message);
    else onSaved();
  };

  return (
    <section className="rounded-2xl border border-accent/40 bg-surface p-4 space-y-3" aria-label={initial ? 'Edit post' : 'New post'}>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-text">{initial ? 'Edit post' : 'New post'}</h2>
        <button type="button" aria-label="Close" onClick={onCancel} className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-text-muted hover:text-text">
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Topic">
        {(Object.keys(NOBLE_TOPIC_LABELS) as NobleTopic[]).map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={topic === t}
            onClick={() => setTopic(t)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              topic === t ? 'bg-primary border-accent text-text' : 'bg-surface border-border text-text-muted hover:text-text'
            }`}
          >
            {NOBLE_TOPIC_LABELS[t]}
          </button>
        ))}
      </div>

      <input
        className={inputClass}
        placeholder="Title (optional)"
        aria-label="Title"
        maxLength={200}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className={`${inputClass} min-h-[140px] leading-relaxed`}
        placeholder="Share a note or recommendation from your experience…"
        aria-label="Post text"
        maxLength={10000}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      {(images.length > 0 || uploading > 0) && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
          {images.map((path) => (
            <div key={path} className="relative aspect-square overflow-hidden rounded-lg border border-border bg-surface-raised">
              <img src={nobleImageUrl(client, path)} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                aria-label="Remove picture"
                onClick={() => setImages((prev) => prev.filter((p) => p !== path))}
                className="absolute top-1 right-1 h-7 w-7 inline-flex items-center justify-center rounded-full bg-black/60 text-white"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          ))}
          {Array.from({ length: uploading }).map((_, i) => (
            <div key={`up-${i}`} className="aspect-square rounded-lg border border-border bg-surface-raised animate-pulse" />
          ))}
        </div>
      )}

      <div className="space-y-2">
        {drugs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {drugs.map((d) => (
              <span key={d.productId} className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-raised/60 pl-2.5 pr-1 py-0.5 text-xs text-accent">
                <Pill className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="truncate max-w-[12rem]">{d.brandName}</span>
                <button
                  type="button"
                  aria-label={`Remove ${d.brandName}`}
                  onClick={() => setDrugs((prev) => prev.filter((x) => x.productId !== d.productId))}
                  className="h-6 w-6 inline-flex items-center justify-center rounded-full text-text-muted hover:text-text"
                >
                  <X className="w-3 h-3" aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>
        )}
        {drugs.length < NOBLE_MAX_DRUGS && (
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" aria-hidden="true" />
            <input
              type="search"
              className={`${inputClass} pl-9`}
              placeholder="Link a drug (optional)…"
              aria-label="Link a drug"
              value={drugQuery}
              onChange={(e) => setDrugQuery(e.target.value)}
            />
            {drugResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1 z-20 rounded-xl border border-border bg-surface shadow-lg max-h-64 overflow-y-auto">
                {drugResults.map((r) => (
                  <button
                    key={r.productId}
                    type="button"
                    onClick={() => {
                      setDrugs((prev) =>
                        prev.some((x) => x.productId === r.productId)
                          ? prev
                          : [...prev, { productId: r.productId, brandName: r.brandNameEn }].slice(0, NOBLE_MAX_DRUGS)
                      );
                      setDrugQuery('');
                      setDrugResults([]);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-surface-raised border-b border-border/60 last:border-0"
                  >
                    <span className="block text-sm text-text">{r.brandNameEn}</span>
                    <span className="block text-[11px] text-text-muted">
                      {[r.genericNameEn, r.companyName].filter(Boolean).join(' · ')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => void onPickImages(e)} />
          <button
            type="button"
            disabled={images.length + uploading >= NOBLE_MAX_IMAGES}
            onClick={() => fileRef.current?.click()}
            className={`${secondaryButtonClass} inline-flex items-center gap-1.5`}
          >
            <ImagePlus className="w-4 h-4" aria-hidden="true" />
            Pictures
          </button>
          <label className="inline-flex items-center gap-1.5 text-xs text-text-muted select-none">
            <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} className="accent-[#1E7BC4]" />
            Pin to top
          </label>
        </div>
        <button
          type="button"
          disabled={saving || uploading > 0 || !body.trim()}
          onClick={() => void save()}
          className={buttonClass}
        >
          {saving ? 'Saving…' : initial ? 'Save changes' : 'Post'}
        </button>
      </div>
      {error && <p className="text-xs text-danger" role="alert">{error}</p>}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Noble doctors list (#/noble)

export function NobleDoctorsView({
  client,
  onBack,
  onOpenDoctor,
  onOpenProduct,
}: {
  client: SupabaseClient;
  onBack: () => void;
  onOpenDoctor: (profileId: string) => void;
  onOpenProduct: (productId: string) => void;
}) {
  const [specialties, setSpecialties] = useState<NobleSpecialty[]>([]);
  const [specialtyId, setSpecialtyId] = useState('');
  const [doctors, setDoctors] = useState<NobleDoctor[]>([]);
  const [feed, setFeed] = useState<NoblePost[]>([]);
  const [me, setMe] = useState<NobleDoctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadNobleSpecialties(client).then((res) => res.ok && setSpecialties(res.data));
    void loadMyNobleStatus(client).then(setMe);
  }, [client]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    void Promise.all([loadNobleDoctors(client, specialtyId), loadNobleFeed(client, { specialtyId, limit: 10 })]).then(
      ([d, f]) => {
        if (!active) return;
        if (!d.ok) setError(d.message);
        setDoctors(d.ok ? d.data : []);
        setFeed(f.ok ? f.data : []);
        setLoading(false);
      }
    );
    return () => {
      active = false;
    };
  }, [client, specialtyId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <button type="button" aria-label="Back" title="Back" onClick={onBack} className={backButtonClass}>
          ←
        </button>
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-text">Noble Doctors</h1>
          <p className="text-xs text-text-muted">Notes and recommendations from experienced doctors</p>
        </div>
      </div>

      {me && (
        <button
          type="button"
          onClick={() => onOpenDoctor(me.profileId)}
          className="w-full flex items-center justify-between gap-3 rounded-2xl border border-accent/40 bg-primary/10 px-4 py-3 text-left"
        >
          <span className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-accent" aria-hidden="true" />
            <span>
              <span className="block text-sm font-semibold text-text">You are a noble doctor</span>
              <span className="block text-xs text-text-muted">Open your page to write a post</span>
            </span>
          </span>
          <ChevronRight className="w-4 h-4 text-text-muted" aria-hidden="true" />
        </button>
      )}

      {specialties.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar -mx-1 px-1 pb-0.5">
          {[{ specialtyId: '', name: 'All', doctorCount: 0 }, ...specialties].map((s) => {
            const active = specialtyId === s.specialtyId;
            return (
              <button
                key={s.specialtyId || 'all'}
                type="button"
                onClick={() => setSpecialtyId(s.specialtyId)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active ? 'bg-primary border-accent text-text' : 'bg-surface border-border text-text-muted hover:text-text'
                }`}
              >
                {s.name}
                {s.doctorCount > 0 ? ` (${s.doctorCount})` : ''}
              </button>
            );
          })}
        </div>
      )}

      {error && <Banner tone="error">{error}</Banner>}

      {loading ? (
        <div role="status" aria-label="Loading noble doctors" className="grid gap-2.5 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl border border-border bg-surface p-4 flex gap-3 animate-pulse">
              <div className="w-12 h-12 rounded-full bg-surface-raised" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-36 rounded bg-surface-raised" />
                <div className="h-3 w-24 rounded bg-surface-raised" />
              </div>
            </div>
          ))}
        </div>
      ) : doctors.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center space-y-1.5">
          <Award className="w-6 h-6 text-text-muted mx-auto" aria-hidden="true" />
          <div className="text-sm font-semibold text-text">No noble doctors here yet</div>
          <p className="text-xs text-text-muted">Experienced doctors will share their notes here soon.</p>
        </div>
      ) : (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {doctors.map((d) => (
            <button
              key={d.profileId}
              type="button"
              onClick={() => onOpenDoctor(d.profileId)}
              className="rounded-2xl border border-border bg-surface hover:bg-surface-raised/60 p-4 flex items-center gap-3 text-left transition-colors"
            >
              <DoctorAvatar client={client} doctor={d} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-text truncate">{d.fullName}</span>
                <span className="block text-xs text-text-muted truncate">
                  {[d.title, d.specialtyName].filter(Boolean).join(' · ')}
                </span>
                <span className="block text-[11px] text-text-muted mt-0.5">
                  {d.postCount === 1 ? '1 post' : `${d.postCount} posts`}
                  {d.workplace ? ` · ${d.workplace}` : ''}
                </span>
              </span>
              <ChevronRight className="w-4 h-4 text-text-muted shrink-0" aria-hidden="true" />
            </button>
          ))}
        </div>
      )}

      {!loading && feed.length > 0 && (
        <section className="space-y-2.5" aria-label="Latest posts">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted px-1">Latest posts</h2>
          {feed.map((p) => (
            <NoblePostCard
              key={p.id}
              client={client}
              post={p}
              showAuthor
              onOpenDoctor={onOpenDoctor}
              onOpenProduct={onOpenProduct}
            />
          ))}
        </section>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// A noble doctor's page (#/noble/<profileId>)

export function NobleDoctorPageView({
  client,
  doctorId,
  myProfileId,
  isAdmin = false,
  onBack,
  onOpenProduct,
}: {
  client: SupabaseClient;
  doctorId: string;
  myProfileId?: string | null;
  isAdmin?: boolean;
  onBack: () => void;
  onOpenProduct: (productId: string) => void;
}) {
  const [page, setPage] = useState<NobleDoctorPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [composer, setComposer] = useState<{ post: NoblePost | null } | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileTitle, setProfileTitle] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [profileError, setProfileError] = useState<string | null>(null);
  const isMine = Boolean(myProfileId) && myProfileId === doctorId;

  const reload = useCallback(async () => {
    const res = await loadNobleDoctorPage(client, doctorId);
    if (!res.ok) {
      setError(res.message);
      setPage(null);
    } else {
      setError(null);
      setPage(res.data);
    }
    setLoading(false);
  }, [client, doctorId]);

  useEffect(() => {
    setLoading(true);
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') window.scrollTo(0, 0);
    void reload();
  }, [reload]);

  const doctor = page?.doctor;

  const saveProfile = async () => {
    setProfileError(null);
    const res = await updateMyNobleProfile(client, profileTitle, profileBio);
    if (!res.ok) {
      setProfileError(res.message);
      return;
    }
    setEditingProfile(false);
    setPage((prev) => (prev ? { ...prev, doctor: res.data } : prev));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <button type="button" aria-label="Back" title="Back" onClick={onBack} className={backButtonClass}>
          ←
        </button>
        <span className="text-xs text-text-muted">Noble Doctors</span>
      </div>

      {error && <Banner tone="error">{error}</Banner>}

      {loading ? (
        <div role="status" aria-label="Loading" className="rounded-2xl border border-border bg-surface p-5 animate-pulse flex gap-4">
          <div className="w-20 h-20 rounded-full bg-surface-raised" />
          <div className="flex-1 space-y-2 pt-2">
            <div className="h-4 w-40 rounded bg-surface-raised" />
            <div className="h-3 w-28 rounded bg-surface-raised" />
          </div>
        </div>
      ) : doctor ? (
        <>
          <section className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="h-16 bg-gradient-to-r from-primary/40 via-surface-raised to-surface" aria-hidden="true" />
            <div className="px-4 pb-4 -mt-10 space-y-3">
              <div className="flex items-end justify-between gap-3">
                <DoctorAvatar client={client} doctor={doctor} size="lg" />
                {isMine && !editingProfile && (
                  <button
                    type="button"
                    onClick={() => {
                      setProfileTitle(doctor.title ?? '');
                      setProfileBio(doctor.bio ?? '');
                      setEditingProfile(true);
                    }}
                    className={`${secondaryButtonClass} inline-flex items-center gap-1.5`}
                  >
                    <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                    Edit page
                  </button>
                )}
              </div>
              <div className="space-y-0.5">
                <h1 className="text-lg font-semibold text-text flex items-center gap-1.5">
                  {doctor.fullName}
                  <Award className="w-4 h-4 text-accent shrink-0" aria-label="Noble doctor" />
                </h1>
                <p className="text-sm text-text-muted">{[doctor.title, doctor.specialtyName].filter(Boolean).join(' · ')}</p>
                {doctor.workplace && <p className="text-xs text-text-muted">{doctor.workplace}</p>}
              </div>
              {editingProfile ? (
                <div className="space-y-2">
                  <input
                    className={inputClass}
                    placeholder="Title, e.g. Consultant Pulmonologist"
                    aria-label="Title"
                    maxLength={120}
                    value={profileTitle}
                    onChange={(e) => setProfileTitle(e.target.value)}
                  />
                  <textarea
                    className={`${inputClass} min-h-[90px]`}
                    placeholder="A few words about your experience"
                    aria-label="About"
                    maxLength={2000}
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button type="button" className={buttonClass} onClick={() => void saveProfile()}>
                      Save
                    </button>
                    <button type="button" className={secondaryButtonClass} onClick={() => setEditingProfile(false)}>
                      Cancel
                    </button>
                  </div>
                  {profileError && <p className="text-xs text-danger">{profileError}</p>}
                </div>
              ) : (
                doctor.bio && <p className="text-sm text-text leading-relaxed whitespace-pre-line">{doctor.bio}</p>
              )}
              <p className="text-[11px] text-text-muted">
                {doctor.postCount === 1 ? '1 post' : `${doctor.postCount} posts`}
              </p>
            </div>
          </section>

          {isMine &&
            (composer ? (
              <NoblePostComposer
                key={composer.post?.id ?? 'new'}
                client={client}
                initial={composer.post}
                onCancel={() => setComposer(null)}
                onSaved={() => {
                  setComposer(null);
                  void reload();
                }}
              />
            ) : (
              <button
                type="button"
                onClick={() => setComposer({ post: null })}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-accent/50 bg-primary/10 px-4 py-3 text-sm font-semibold text-accent hover:bg-primary/20"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                Write a post
              </button>
            ))}

          {page.posts.length === 0 ? (
            <Banner tone="info">{isMine ? 'Your first post will appear here.' : 'No posts yet.'}</Banner>
          ) : (
            <div className="space-y-2.5">
              {page.posts.map((p) => (
                <NoblePostCard
                  key={p.id}
                  client={client}
                  post={p}
                  canManage={isMine}
                  isAdmin={isAdmin}
                  onEdit={(post) => {
                    setComposer({ post });
                    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') window.scrollTo(0, 0);
                  }}
                  onDeleted={(id) => setPage((prev) => (prev ? { ...prev, posts: prev.posts.filter((x) => x.id !== id) } : prev))}
                  onHiddenChange={(id, hidden) =>
                    setPage((prev) =>
                      prev ? { ...prev, posts: prev.posts.map((x) => (x.id === id ? { ...x, isHidden: hidden } : x)) } : prev
                    )
                  }
                  onOpenProduct={onOpenProduct}
                />
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// On the drug page: noble doctors' notes about this drug

export function ProductNobleNotes({
  client,
  productId,
  onOpenDoctor,
  onOpenProduct,
}: {
  client: SupabaseClient;
  productId: string;
  onOpenDoctor: (profileId: string) => void;
  onOpenProduct: (productId: string) => void;
}) {
  const [notes, setNotes] = useState<NoblePost[]>([]);
  useEffect(() => {
    let active = true;
    setNotes([]);
    void loadProductNobleNotes(client, productId).then((res) => active && res.ok && setNotes(res.data));
    return () => {
      active = false;
    };
  }, [client, productId]);
  if (notes.length === 0) return null;
  return (
    <section className="space-y-2.5" aria-label="Noble doctors’ notes">
      <h2 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-muted px-1">
        <Award className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
        Noble doctors’ notes
      </h2>
      {notes.map((p) => (
        <NoblePostCard
          key={p.id}
          client={client}
          post={p}
          showAuthor
          onOpenDoctor={onOpenDoctor}
          onOpenProduct={(id) => id !== productId && onOpenProduct(id)}
        />
      ))}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Admin: choose noble doctors, see and hide their posts

export function AdminNobleDoctorsPanel({ client }: { client: SupabaseClient }) {
  const [nobles, setNobles] = useState<NobleDoctor[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AdminDoctorRow[]>([]);
  const [adding, setAdding] = useState<AdminDoctorRow | null>(null);
  const [title, setTitle] = useState('');
  const [openDoctorId, setOpenDoctorId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ tone: 'error' | 'info'; text: string } | null>(null);

  const reloadNobles = useCallback(() => {
    void loadNobleDoctors(client).then((res) => res.ok && setNobles(res.data));
  }, [client]);
  useEffect(reloadNobles, [reloadNobles]);

  useEffect(() => {
    let active = true;
    const t = window.setTimeout(() => {
      void adminSearchDoctors(client, query).then((res) => {
        if (!active) return;
        if (res.ok) setResults(res.data);
        else setNotice({ tone: 'error', text: res.message });
      });
    }, 300);
    return () => {
      active = false;
      window.clearTimeout(t);
    };
  }, [client, query]);

  const nobleIds = useMemo(() => new Set(nobles.map((n) => n.profileId)), [nobles]);

  const makeNoble = async () => {
    if (!adding?.specialtyId) {
      setNotice({ tone: 'error', text: 'This doctor has no specialty yet.' });
      return;
    }
    const res = await adminSetNobleDoctor(client, {
      profileId: adding.profileId,
      specialtyId: adding.specialtyId,
      title,
      active: true,
    });
    if (!res.ok) {
      setNotice({ tone: 'error', text: res.message });
      return;
    }
    setNotice({ tone: 'info', text: `${res.data.fullName} is now a noble doctor.` });
    setAdding(null);
    setTitle('');
    reloadNobles();
  };

  const removeNoble = async (d: NobleDoctor) => {
    const res = await adminSetNobleDoctor(client, { profileId: d.profileId, specialtyId: d.specialtyId, active: false });
    if (!res.ok) setNotice({ tone: 'error', text: res.message });
    else {
      setNotice({ tone: 'info', text: `${d.fullName} is no longer a noble doctor. Their posts are hidden from doctors.` });
      if (openDoctorId === d.profileId) setOpenDoctorId(null);
      reloadNobles();
    }
  };

  return (
    <section className="space-y-4" aria-label="Noble doctors">
      <div>
        <h2 className="text-base font-semibold text-text flex items-center gap-1.5">
          <Award className="w-4 h-4 text-accent" aria-hidden="true" />
          Noble doctors
        </h2>
        <p className="text-xs text-text-muted">
          Noble doctors post straight away, with pictures. You can hide any post or remove the noble role.
        </p>
      </div>

      {notice && <Banner tone={notice.tone}>{notice.text}</Banner>}

      <div className="rounded-2xl border border-border bg-surface p-4 space-y-3">
        <h3 className="text-sm font-semibold text-text">Current noble doctors ({nobles.length})</h3>
        {nobles.length === 0 ? (
          <p className="text-xs text-text-muted">None yet. Add one below.</p>
        ) : (
          <div className="divide-y divide-border/70">
            {nobles.map((d) => (
              <div key={d.profileId} className="py-2.5 space-y-2">
                <div className="flex items-center gap-3">
                  <DoctorAvatar client={client} doctor={d} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-text truncate">{d.fullName}</div>
                    <div className="text-[11px] text-text-muted truncate">
                      {[d.title, d.specialtyName, `${d.postCount} posts`].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={secondaryButtonClass}
                    onClick={() => setOpenDoctorId(openDoctorId === d.profileId ? null : d.profileId)}
                  >
                    {openDoctorId === d.profileId ? 'Close' : 'Posts'}
                  </button>
                  <button
                    type="button"
                    className="min-h-[40px] rounded-lg border border-danger/40 px-3 text-sm text-danger hover:bg-danger/10"
                    onClick={() => void removeNoble(d)}
                  >
                    Remove
                  </button>
                </div>
                {openDoctorId === d.profileId && (
                  <AdminNoblePosts client={client} doctorId={d.profileId} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-border bg-surface p-4 space-y-3">
        <h3 className="text-sm font-semibold text-text">Add a noble doctor</h3>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" aria-hidden="true" />
          <input
            type="search"
            className={`${inputClass} pl-9`}
            placeholder="Search approved doctors by name, email or phone…"
            aria-label="Search doctors"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="divide-y divide-border/70 max-h-80 overflow-y-auto">
          {results.map((r) => {
            const already = r.isNoble || nobleIds.has(r.profileId);
            return (
              <div key={r.profileId} className="py-2.5 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-text truncate">{r.fullName}</div>
                    <div className="text-[11px] text-text-muted truncate">
                      {[r.specialtyName, r.email, r.workplace].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                  {already ? (
                    <span className="text-xs text-accent font-medium">Noble</span>
                  ) : (
                    <button
                      type="button"
                      className={secondaryButtonClass}
                      onClick={() => {
                        setAdding(r);
                        setTitle('');
                      }}
                    >
                      Make noble
                    </button>
                  )}
                </div>
                {adding?.profileId === r.profileId && (
                  <div className="flex flex-wrap gap-2">
                    <input
                      className={`${inputClass} flex-1 min-w-[12rem]`}
                      placeholder="Title, e.g. Consultant Pulmonologist (optional)"
                      aria-label="Noble title"
                      maxLength={120}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <button type="button" className={buttonClass} onClick={() => void makeNoble()}>
                      Confirm
                    </button>
                    <button type="button" className={secondaryButtonClass} onClick={() => setAdding(null)}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          {results.length === 0 && <p className="py-2 text-xs text-text-muted">No approved doctors match.</p>}
        </div>
      </div>
    </section>
  );
}

function AdminNoblePosts({ client, doctorId }: { client: SupabaseClient; doctorId: string }) {
  const [posts, setPosts] = useState<NoblePost[] | null>(null);
  useEffect(() => {
    void loadNobleDoctorPage(client, doctorId).then((res) => setPosts(res.ok ? res.data.posts : []));
  }, [client, doctorId]);
  if (!posts) return <p className="text-xs text-text-muted">Loading posts…</p>;
  if (posts.length === 0) return <p className="text-xs text-text-muted">No posts yet.</p>;
  return (
    <div className="space-y-2">
      {posts.map((p) => (
        <NoblePostCard
          key={p.id}
          client={client}
          post={p}
          isAdmin
          onDeleted={(id) => setPosts((prev) => (prev ?? []).filter((x) => x.id !== id))}
          onHiddenChange={(id, hidden) => setPosts((prev) => (prev ?? []).map((x) => (x.id === id ? { ...x, isHidden: hidden } : x)))}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Home page: two noble doctors' posts above the ad space. The top card shows
// posts from the doctor's own specialty, the second card posts from all
// noble doctors. Each card goes through all its posts again and again (next
// post every 12 s, soft fade); the two cards never show the same post at the
// same time. Hidden with no posts or no internet.

const HOME_ROTATE_MS = 12000;
const HOME_SLOT_MS = 10 * 60 * 1000;
const HOME_FEED_LIMIT = 50;

function RotatingNoblePost({
  client,
  posts,
  label,
  avoidPostId,
  delayMs = 0,
  onShow,
  onOpenDoctor,
}: {
  client: SupabaseClient;
  posts: NoblePost[];
  label: string;
  /** Skip this post (shown by the other card right now). */
  avoidPostId?: string | null;
  /** Start the timer later so the two cards do not change at the same moment. */
  delayMs?: number;
  onShow?: (postId: string | null) => void;
  onOpenDoctor: (profileId: string) => void;
}) {
  const [index, setIndex] = useState(() =>
    posts.length > 0 ? Math.floor(Date.now() / HOME_SLOT_MS) % posts.length : 0
  );
  const [shown, setShown] = useState(true);
  const avoidRef = useRef(avoidPostId);
  avoidRef.current = avoidPostId;

  // When the list changes, start again at this 10-minute slot's post.
  useEffect(() => {
    setIndex(posts.length > 0 ? Math.floor(Date.now() / HOME_SLOT_MS) % posts.length : 0);
  }, [posts]);

  // Never show the post the other card is showing.
  useEffect(() => {
    if (posts.length > 1 && posts[index]?.id === avoidPostId) setIndex((i) => (i + 1) % posts.length);
  }, [posts, index, avoidPostId]);

  useEffect(() => {
    if (posts.length < 2) return;
    let fade: number | undefined;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;
        setShown(false);
        fade = window.setTimeout(() => {
          setIndex((i) => {
            let next = (i + 1) % posts.length;
            if (posts[next]?.id === avoidRef.current && posts.length > 2) next = (next + 1) % posts.length;
            return next;
          });
          setShown(true);
        }, 250);
      }, HOME_ROTATE_MS);
    }, delayMs);
    return () => {
      window.clearTimeout(start);
      if (timer) window.clearInterval(timer);
      if (fade) window.clearTimeout(fade);
    };
  }, [posts, delayMs]);

  const post = posts[index];
  useEffect(() => {
    onShow?.(post?.id ?? null);
  }, [post?.id, onShow]);

  if (!post?.author) return null;
  const author = post.author;
  const firstImage = post.images[0];
  const dots = Math.min(posts.length, 8);

  return (
    <section aria-label={label} className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 px-1">
        <h2 className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-muted min-w-0">
          <Award className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden="true" />
          <span className="truncate">{label}</span>
        </h2>
        {posts.length > 1 && (
          <div className="flex items-center gap-1 shrink-0" role="tablist" aria-label="Choose a post">
            {Array.from({ length: dots }).map((_, i) => {
              const active = index % dots === i;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Post ${i + 1}`}
                  onClick={() => {
                    setIndex(i);
                    setShown(true);
                  }}
                  className="h-6 w-4 inline-flex items-center justify-center"
                >
                  <span className={`block h-1.5 rounded-full transition-all ${active ? 'w-3 bg-accent' : 'w-1.5 bg-border'}`} />
                </button>
              );
            })}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => onOpenDoctor(author.profileId)}
        className={`w-full text-left rounded-2xl border border-border bg-surface hover:bg-surface-raised/60 p-3.5 flex gap-3 transition-opacity duration-200 ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-center gap-2">
            <DoctorAvatar client={client} doctor={author} size="sm" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-text truncate">{author.fullName}</span>
              <span className="block text-[11px] text-text-muted truncate">
                {[author.title, author.specialtyName].filter(Boolean).join(' · ')}
              </span>
            </span>
          </div>
          {post.title && <p className="text-sm font-semibold text-text leading-snug line-clamp-1">{post.title}</p>}
          <p className="text-xs text-text-muted leading-relaxed line-clamp-3 whitespace-pre-line">{post.body}</p>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-accent">
            Read more
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
        {firstImage && (
          <img
            src={nobleImageUrl(client, firstImage)}
            alt=""
            loading="lazy"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-border shrink-0 self-center"
          />
        )}
      </button>
    </section>
  );
}

export function HomeNoblePosts({
  client,
  specialtyId,
  onOpenDoctor,
}: {
  client: SupabaseClient;
  specialtyId?: string | null;
  onOpenDoctor: (profileId: string) => void;
}) {
  const [mine, setMine] = useState<NoblePost[]>([]);
  const [all, setAll] = useState<NoblePost[]>([]);
  const [topShowing, setTopShowing] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (isOffline()) return;
    void loadNobleFeed(client, { limit: HOME_FEED_LIMIT }).then((res) => active && res.ok && setAll(res.data));
    if (specialtyId) {
      void loadNobleFeed(client, { specialtyId, limit: HOME_FEED_LIMIT }).then(
        (res) => active && setMine(res.ok ? res.data : [])
      );
    } else {
      setMine([]);
    }
    return () => {
      active = false;
    };
  }, [client, specialtyId]);

  const specialtyName = mine[0]?.author?.specialtyName ?? null;
  // With only one post in total, show it once (in the top card if it is from the doctor's specialty).
  const general = mine.length > 0 && all.length <= 1 ? [] : all;
  const onTopShow = useCallback((id: string | null) => setTopShowing(id), []);

  if (mine.length === 0 && general.length === 0) return null;
  return (
    <div className="space-y-3">
      {mine.length > 0 && (
        <RotatingNoblePost
          client={client}
          posts={mine}
          label={specialtyName ? `Noble doctors · ${specialtyName}` : 'Noble doctors · your specialty'}
          onShow={onTopShow}
          onOpenDoctor={onOpenDoctor}
        />
      )}
      {general.length > 0 && (
        <RotatingNoblePost
          client={client}
          posts={general}
          label="From all noble doctors"
          avoidPostId={mine.length > 0 ? topShowing : null}
          delayMs={mine.length > 0 ? HOME_ROTATE_MS / 2 : 0}
          onOpenDoctor={onOpenDoctor}
        />
      )}
    </div>
  );
}
