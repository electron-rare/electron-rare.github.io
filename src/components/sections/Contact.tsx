import * as React from 'react';
import { motion } from 'motion/react';
import { CtaDualRail } from '@/components/ui/cta-dual-rail';
import { TRACK_EVENTS, trackEvent } from '@/lib/tracking';
import { useCopyContent } from '@/lib/copy';
import styles from './Contact.module.css';

type ContactMode = 'simple' | 'pro';
type FeedbackState = { kind: 'idle' | 'success' | 'error'; message: string };

export function Contact() {
  const { copy } = useCopyContent();
  const [mode, setMode] = React.useState<ContactMode>('simple');
  const [brief, setBrief] = React.useState('');
  const [feedback, setFeedback] = React.useState<FeedbackState>({ kind: 'idle', message: '' });

  const simpleBrief = React.useMemo(
    () =>
      [
        `${copy.mission.planLabels.briefTitle} - Version simple`,
        'Idee produit: ',
        'A quoi ca sert: ',
        'Contrainte principale: ',
        'Delai souhaite: '
      ].join('\n'),
    [copy.mission.planLabels.briefTitle]
  );

  const proBrief = React.useMemo(
    () =>
      [
        `${copy.mission.planLabels.briefTitle} - Version pro`,
        'Stack / architecture actuelle: ',
        'Symptomes observes: ',
        'Contraintes (CEM, conso, cout, delai): ',
        'Mesures deja faites: ',
        'Objectif de validation: '
      ].join('\n'),
    [copy.mission.planLabels.briefTitle]
  );

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem('er_mission_brief');
      if (saved && saved.trim()) {
        setBrief(saved);
        return;
      }
    } catch (_error) {
      // Ignore localStorage errors.
    }
    setBrief(simpleBrief);
  }, [simpleBrief]);

  const applyMode = React.useCallback(
    (nextMode: ContactMode) => {
      setMode(nextMode);
      const template = nextMode === 'simple' ? simpleBrief : proBrief;
      setBrief(template);
      setFeedback({ kind: 'idle', message: '' });
      try {
        localStorage.setItem('er_mission_brief', template);
      } catch (_error) {
        // Ignore localStorage errors.
      }
      trackEvent('contact_mode_selected', {
        destination: '#contact',
        selected_mode: nextMode
      });
    },
    [proBrief, simpleBrief]
  );

  const copyBrief = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setFeedback({ kind: 'success', message: 'Brief copie dans le presse-papiers.' });
      trackEvent(TRACK_EVENTS.funnelBriefCopied, {
        destination: '#contact',
        source: 'contact_brief',
        brief_chars: brief.length
      });
    } catch (_error) {
      setFeedback({ kind: 'error', message: 'Impossible de copier automatiquement. Copiez le texte manuellement.' });
    }
  }, [brief]);

  const mailHref = React.useMemo(() => {
    const subject = encodeURIComponent(copy.contact.mailSubject);
    const body = encodeURIComponent(brief);
    return `mailto:contact@lelectronrare.com?subject=${subject}&body=${body}`;
  }, [brief, copy.contact.mailSubject]);

  const onSendMail = React.useCallback(() => {
    setFeedback({ kind: 'success', message: 'Client mail ouvert avec votre brief pre-rempli.' });
    trackEvent(TRACK_EVENTS.funnelContactSubmitted, {
      destination: 'mailto:contact@lelectronrare.com',
      source: 'contact_form',
      brief_chars: brief.length
    });
  }, [brief.length]);

  return (
    <motion.section
      id="contact"
      aria-labelledby="contact-title"
      className="section-anchor mt-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="circuit-board rounded-2xl p-5 md:p-6">
        <div className="circuit-title-row">
          <span className="circuit-node circuit-node--magenta" aria-hidden="true" />
          <h2 id="contact-title" className="m-0 text-3xl md:text-4xl">
            {copy.contact.title}
          </h2>
          <span className="circuit-pinline" aria-hidden="true" />
        </div>

        <p className="section-lead mb-0 mt-3">{copy.contact.lead}</p>

        <p className="mb-0 mt-3 max-w-3xl studio-muted">{copy.contact.helpText}</p>

        <div className={`${styles.highlight} mt-4`}>
          <p className={styles.kicker}>Formulaire de contact (prioritaire)</p>
          <div className={styles.modeSwitch} role="tablist" aria-label="Version formulaire">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'simple'}
              className={`${styles.modeBtn} ${mode === 'simple' ? styles.modeBtnActive : ''}`}
              onClick={() => applyMode('simple')}
            >
              Version simple
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'pro'}
              className={`${styles.modeBtn} ${mode === 'pro' ? styles.modeBtnActive : ''}`}
              onClick={() => applyMode('pro')}
            >
              Version pro
            </button>
          </div>
          <p className={styles.modeHint}>
            {mode === 'simple'
              ? "Simple: decrivez l'idee, l'usage et la contrainte principale."
              : 'Pro: ajoutez stack, symptomes et mesures deja effectuees.'}
          </p>
        </div>

        <div className={styles.brief}>
          <p className={styles.briefKicker}>{copy.contact.formKicker}</p>
          <textarea
            className={styles.briefInput}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={7}
            suppressHydrationWarning
            style={{ caretColor: 'inherit' }}
          />
          <div className={styles.actions}>
            <button type="button" className={styles.btn} onClick={copyBrief}>
              {copy.contact.copyBrief}
            </button>
            <a href={mailHref} className={`${styles.btn} ${styles.btnPrimary}`} onClick={onSendMail}>
              {copy.contact.sendByMail}
            </a>
          </div>

          {feedback.kind !== 'idle' ? (
            <p className={`${styles.feedback} ${feedback.kind === 'success' ? styles.feedbackSuccess : styles.feedbackError}`} aria-live="polite">
              {feedback.message}
            </p>
          ) : null}
        </div>

        <CtaDualRail className="mt-4" label="LinkedIn direct (optionnel)" />
      </div>
    </motion.section>
  );
}
