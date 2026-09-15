import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { getDictionary } from "@/i18n";
import { PageHero } from "@/components/shared/PageHero";
import { FadeUp, Parallax, SpotlightCard, Stagger } from "@/components/motion/motion";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { href, routes, social } from "@/lib/utils";

export default async function CareersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero title={dict.careers.title} lead={dict.careers.lead} leadScroll />
      <Section>
        <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeUp>
            <Parallax speed={0.04}>
              <div className="shot-frame">
                <Image src="/images/pages/carreras.png" alt="" width={720} height={520} className="w-full object-cover" />
              </div>
            </Parallax>
          </FadeUp>
          <Stagger className="space-y-4">
            {dict.careers.jobs.map((job) => (
              <SpotlightCard key={job.title} className="card-lift rounded-[20px] border border-border bg-surface p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent">{job.area}</p>
                    <h2 className="mt-2 text-xl font-semibold text-fg">{job.title}</h2>
                  </div>
                  <span className="rounded-full border border-border bg-bg-soft px-3 py-1 text-[11px] font-medium text-muted">
                    Próxima convocatoria
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} aria-hidden /> {job.city}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} aria-hidden /> {job.type}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{job.body}</p>
              </SpotlightCard>
            ))}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <p className="mr-2 text-sm text-muted">{dict.careers.cta}</p>
              <Button href={`mailto:${social.email}?subject=Carreras KIVIO`} external>
                {dict.common.contactUs}
              </Button>
              <Button href={href(lang, routes.contact)} variant="outline">
                {dict.nav.contact}
              </Button>
            </div>
          </Stagger>
        </Container>
      </Section>
    </>
  );
}
