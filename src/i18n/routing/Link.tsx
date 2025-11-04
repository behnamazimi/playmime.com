"use client";

import { createNavigation } from "next-intl/navigation";
import routing from "@/i18n/routing/index";

const { Link } = createNavigation(routing);

export default Link;
