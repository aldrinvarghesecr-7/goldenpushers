import SectionReveal from './SectionReveal';

interface Props {
    text: string;
}

export default function QuoteMoment({ text }: Props) {
    return (
        <SectionReveal className="py-32 md:py-48 bg-primary flex items-center justify-center text-center px-8">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif leading-tight max-w-5xl mx-auto uppercase tracking-wide">
                {text}
            </h2>
        </SectionReveal>
    );
}
