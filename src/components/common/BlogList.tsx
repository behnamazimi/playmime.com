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
    <div className={`border-t pt-6 text-sm text-gray-500 ${className}`}>
      <h4 className="text-base font-semibold mb-4">{title}</h4>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {slugs.map((slug) => (
          <li key={slug}>
            <Link
              href={`/blog/${slug}`}
              className="hover:text-primary transition-colors"
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
