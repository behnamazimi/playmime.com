import Link from "@/i18n/routing/Link";
import { BLOG_ITEMS } from "@/constants/blog";
import { useLocale } from "next-intl";

interface BlogListProps {
  title: string;
  excludeSlug?: string;
  className?: string;
}

export default function BlogList({
  title,
  excludeSlug,
  className = "",
}: BlogListProps) {
  const locale = useLocale();
  const slugs = excludeSlug
    ? BLOG_ITEMS[locale].filter((slug) => slug !== excludeSlug)
    : BLOG_ITEMS[locale];

  if (slugs.length === 0) return null;

  return (
    <div
      className={`border-t border-primary/20 pt-6 text-sm text-muted-foreground ${className}`}
    >
      <h4 className="text-lg font-bold mb-4 text-foreground text-neon-cyan">
        {title}
      </h4>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {slugs.map((slug) => (
          <li key={slug}>
            <Link
              href={`/blog/${slug}`}
              className="hover:text-neon-cyan transition-colors duration-300 block"
            >
              {slug
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
