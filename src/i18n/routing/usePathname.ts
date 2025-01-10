import { createNavigation } from "next-intl/navigation";
import routing from "@/i18n/routing/index";

const { usePathname } = createNavigation(routing);

export default usePathname;
