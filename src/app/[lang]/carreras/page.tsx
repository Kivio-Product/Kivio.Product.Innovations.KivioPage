import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { getDictionary } from "@/i18n";
import { PageHero } from "@/components/shared/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { href, routes, social } from "@/lib/utils";

export default async function CareersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return (
    <>
      <PageHero title={dict.careers.title} lead={dict.careers.lead} />
      <Section>
        <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Image
            src="/images/pages/carreras.png"
            alt=""
            width={720}
            height={520}
            className="w-full rounded-[25px] object-cover"
          />
          <div className="space-y-4">
            {dict.careers.jobs.map((job) => (
              <article key={job.title} className="rounded-[20px] border border-border bg-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">{job.area}</p>
                <h2 className="mt-2 text-xl font-semibold text-fg">{job.title}</h2>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} /> {job.city}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} /> {job.type}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{job.body}</p>
              </article>
            ))}
            <p className="pt-4 text-sm text-muted">{dict.careers.cta}</p>
            <Button href={`mailto:${social.email}?subject=Carreras KIVIO`} external>
              {dict.common.contactUs}
            </Button>
            <Button href={href(lang, routes.contact)} variant="outline" className="ml-2">
              {dict.nav.contact}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
