"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Frame, Sun, Moon, CircleAlertIcon, CircleDashedIcon, CircleCheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/navLinks";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]


export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // * Listen for scroll events to update sticky behavior.
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn("container mx-auto sticky top-2 z-[9999]")}>
            <div className="md:hidden flex justify-end">
                {/* TODO: implement mobile navbar */}
            </div>
            {/* main container */}
            <div
                className={cn(
                    "hidden md:flex justify-between items-center transition-all transform ease-in-out duration-300",
                    scrolled
                        ? "scale-95 xl:scale-90 px-4 py-3 rounded-full bg-primary/10 backdrop-blur-lg backdrop-filter"
                        : "scale-100"
                )}
            >
                <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                    <div className="clip-path-icon-box p-1">
                        <Frame className="h-6 w-6" />
                    </div>
                    <span className="font-semibold">
                        Chargeflow
                    </span>
                </Link>

                {/* Desktop Navigation */}
                {/* <nav className="flex items-center gap-6">
                    {navLinks?.map((link, index) => (
                        <button
                            key={link.name}
                            className="rounded-full cursor-pointer"
                        >
                            {link.name}
                        </button>
                    ))}

                </nav> */}
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="w-96">
                                    <ListItem href="/docs" title="Introduction">
                                        Re-usable components built with Tailwind CSS.
                                    </ListItem>
                                    <ListItem href="/docs/installation" title="Installation">
                                        How to install dependencies and structure your app.
                                    </ListItem>
                                    <ListItem href="/docs/primitives/typography" title="Typography">
                                        Styles for headings, paragraphs, lists...etc
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="hidden md:flex">
                            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                    {components.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[200px]">
                                    <li>
                                        <Link href="#" className="flex-row items-center gap-2"><CircleAlertIcon />Backlog</Link>
                                        <Link href="#" className="flex-row items-center gap-2"><CircleDashedIcon />To Do</Link>
                                        <Link href="#" className="flex-row items-center gap-2"><CircleCheckIcon />Done</Link>
                                    </li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/docs">Docs</Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                {/* CTA Button */}
                <Button className="cursor-pointer text-sm px-4 py-[7px] rounded-full font-medium clip-path-badge">
                    Book Demo
                </Button>
            </div>
        </header>
    );
}


function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <Link href={href}><div className="flex flex-col gap-1 text-sm">
                <div className="leading-none font-medium">{title}</div>
                <div className="text-muted-foreground line-clamp-2">{children}</div>
            </div></Link>
        </li>
    )
}
