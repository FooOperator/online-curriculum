/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import superjson from "superjson";
import Head from "next/head";
import path from "path";
import { readdir, readdirSync, readFileSync } from "fs";
import dynamic from "next/dynamic";
import React, { SelectHTMLAttributes, useEffect, useState } from "react";
import {
	FaGithub,
	FaPhoneSquareAlt,
	FaGithubSquare,
	FaLinkedin,
	FaEnvelopeSquare,
} from "react-icons/fa";
import { IconType } from "react-icons";
import useBreakpoint from "../hooks/useBreakpoint";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { any } from "zod";

const Home = ({ tabData }: { tabData: { [key: string]: any } }) => {
	const tabs = [
		{
			name: "Projects",
			content: (
				<Projects projects={tabData["projects"] as Project[]} />
			),
		},
		{
			name: "Experience",
		},
		{
			name: "Skills",
			content: <Skills skills={tabData["skills"] as Skill[]} />,
		},
	];
	return (
		<>
			<Head>
				<title>Lucas Guerra Cardoso{"'"}s CV</title>
				<meta name="description" content="Thanks to t3-app!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="basis-full flex dark:text-gray-200 text-gray-700">
				<Sidebar />
				<div className="mx-1 border-r-2 border-slate-700 dark:border-slate-300" />
				<div className="flex flex-col w-full ml-3">
					<div className="ml-auto p-2">
						<Toolbar />
					</div>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-2">
							<h2 className="text-2xl ">About Me</h2>
							<hr className="mx-1" />
							<p className="">
								I{"'"}m pursuing a web developer position -
								I love to create <i>easy-to-use</i>{" "}
								interfaces and prefer <i>serverless</i>{" "}
								nowadays. Willing to work with any
								technology, but love{" "}
								<strong>Typescript</strong>,{" "}
								<strong>Next.JS</strong> and{" "}
								<strong>Tailwind</strong> (
								<strong>Chakra</strong> is fine too).
							</p>
						</div>
						<div>
							<Tabs items={tabs} />
						</div>
					</div>
				</div>
			</main>
			<footer className="mt-auto py-1 px-2">
				<a
					className="link"
					href="https://github.com/FooOperator/online-curriculum">
					Check out the repo for this site
				</a>
				{/* <pre>{JSON.stringify(tabData, null, 6)}</pre> */}
			</footer>
		</>
	);
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
	const dataDir = "./src/data/";
	const jsons = readdirSync(dataDir);
	const dataFiles: { [key: string]: string } = {};
	jsons.forEach((file) => {
		const filePath = path.join(dataDir + file);
		const data = readFileSync(filePath);
		dataFiles[file.substring(0, file.length - 5)] = JSON.parse(
			data.toString()
		);
	});

	return {
		props: {
			tabData: dataFiles,
			...(await serverSideTranslations(locale, ["common"])),
		},
	};
};

const DarkModeSwitch = dynamic(
	() => import("../components/DarkModeSwitch"),
	{ ssr: false }
);

const Contacts = () => {
	return (
		<div className="flex my-2 dark:bg-slate-800 bg-gray-200 rounded-md p-2">
			<ContactIcon
				link="https://github.com/FooOperator"
				Icon={FaGithubSquare}
			/>
			<ContactIcon
				link="https://www.linkedin.com/in/lucas-guerra-cardoso-1b273a182/"
				Icon={FaLinkedin}
			/>
			<ContactIcon link="tel:35191188963" Icon={FaPhoneSquareAlt} />
			<ContactIcon
				link="mailto:devgcard@gmail.com"
				Icon={FaEnvelopeSquare}
			/>
		</div>
	);
};

const InfoRow = ({ field, value }: { field: string; value: string }) => {
	return (
		<li className="flex items-center sm:flex-col md:flex-row lg:flex-row w-full justify-between">
			<span>{field}</span>
			<span>{value}</span>
		</li>
	);
};

const Sidebar = () => {
	const { t } = useTranslation();
	return (
		<div className="flex flex-col mt-8 sm:mx-1 md:mx-2 lg:mx-3 items-center gap-3 px-2 min-h-full sm:w-5/12 md:w-4/12 lg:w-3/12">
			<div className="flex flex-col gap-2 items-center">
				<img
					className="w-20 h-20 sm:w-16 sm:h-16 md:w-22 md:h-22 lg:w-32 lg:h-32 rounded-full"
					src="https://media-exp1.licdn.com/dms/image/C4E03AQHVJ8VM7ImT7A/profile-displayphoto-shrink_800_800/0/1649815425250?e=1666224000&v=beta&t=HvNR3OzymeOSzwb6pP3fZ5AAfXGZXn1mwoClmuu3tyA"
					alt="lucas guerra cardoso"
				/>
				<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl whitespace-nowrap">
					Lucas Guerra Cardoso
				</h1>
			</div>
			<Contacts />
			<ul className="flex flex-col w-full p-2 gap-1 sm:gap-2 sm:text-sm text-md">
				<InfoRow
					field={t("personalInfo.resides")}
					value="Porto, Portugal"
				/>
				<InfoRow
					field={t("personalInfo.address")}
					value="Rua Da Breia, 67"
				/>
				<InfoRow
					field={t("personalInfo.dob")}
					value="04/08/2000"
				/>
				<InfoRow
					field={t("personalInfo.nationality")}
					value={"Brazilian"}
				/>
			</ul>
		</div>
	);
};

type ProjectCardProps = CardProps & Omit<Project, "name" | "description">;

type Project = {
	name: string;
	description: string;
	link: string;
	repo: string;
};

const ProjectCard = (props: ProjectCardProps) => {
	const [isOverCard, setIsOverCard] = useState<boolean>(false);

	return (
		<div
			onClick={() => {
				window.open(props.link);
			}}
			className="card relative"
			onMouseEnter={() => setIsOverCard(true)}
			onMouseLeave={() => setIsOverCard(false)}>
			<img src="" alt="" />
			<h3 className="text-2xl">{props.title}</h3>
			<p className="">{props.description}</p>
			<button
				className={`repo-btn absolute bottom-0 right-1  ${
					isOverCard && "visible"
				}`}
				onClick={() => {
					window.open(props.repo);
				}}>
				<div className="flex w-full justify-between gap-4">
					<span className="visible">Repo</span>
					<FaGithub size={25} />
				</div>
			</button>
		</div>
	);
};

const Projects = ({ projects }: { projects: Project[] }) => {
	return (
		<div className="flex flex-col gap-2">
			<ul className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 border-2 m-1 dark:border-slate-100 border-slate-700 overflow-y-auto scrollbar-thumb-slate-200 scrollbar-track-slate-100 w-4/4 p-1 gap-x-2 gap-y-1">
				{projects.map((project, index) => (
					<li
						className="w-4/4 sm:h-32 md:h-44 lg:h-44"
						key={index}>
						<ProjectCard title={project.name} {...project} />
					</li>
				))}
			</ul>
		</div>
	);
};

type Tab = {
	name: string;
	content?: JSX.Element;
};

type TabsProps = {
	items: Tab[];
	defaultIndex?: number;
	isVertical?: true;
};

const Tabs = ({ items, defaultIndex, isVertical }: TabsProps) => {
	const [currentIndex, setCurrentIndex] = useState<number>(
		defaultIndex ?? 0
	);
	const handleSelectTab = (index: number) => {
		setCurrentIndex(index);
	};
	return (
		<div className={`flex ${!isVertical && "flex-col"} p-2`}>
			<ul
				className={`flex ${
					isVertical && "flex-col mb-auto"
				} mt-2  gap-1  justify-center mb-2`}>
				{items.map(({ name }, index) => (
					<li
						className={`border-2 clickable w-28 text-center ${
							currentIndex === index && "selected"
						}`}
						onClick={() => handleSelectTab(index)}
						key={index}>
						{name}
					</li>
				))}
			</ul>
			<div className={` basis-full overflow-auto`}>
				{items[currentIndex]?.content ?? (
					<h2>Content Should Appear Here</h2>
				)}
			</div>
		</div>
	);
};

const Toolbar = () => {
	const isMobile = useBreakpoint();
	const { i18n } = useTranslation();
	const { locales, locale } = useRouter();
	const { language, languages } = i18n;

	const handleSelect = async (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const { value } = e.currentTarget;
		i18n.changeLanguage(value);
	};

	return (
		<div className="flex justify-evenly">
			<div className="flex gap-2 ml-auto">
				<DarkModeSwitch />
				<select
					onChange={handleSelect}
					className={`dark:bg-slate-700 ${
						isMobile ? "w-20 px-2" : undefined
					} px-8 py-0`}
					name="language">
					{locales!.map((lang, index) => (
						<option
							selected={locale === lang}
							key={index}
							value={lang}>
							{lang}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

type ContactIconProps = {
	link: string;
	Icon: IconType;
};

const ContactIcon = ({ link, Icon }: ContactIconProps) => {
	const isMobile = useBreakpoint();

	return (
		<a target={"_blank"} href={link} rel="noreferrer">
			<Icon
				className={`hover:text-gray-700 dark:hover:text-gray-300 dark:text-gray-200`}
				size={isMobile ? 25 : 45}
			/>
		</a>
	);
};

type CardProps = {
	title: string;
	description: string;
};

type SkillLevel = "beginner" | "intermediary" | "proficient" | "master";

type SkillCategory =
	| "all"
	| "database"
	| "programming"
	| "styling"
	| "design";

type Skill = {
	name: string;
	level: SkillLevel;
	category: SkillCategory;
	docs: string;
	iconUrl: string;
};

const skillLevelOrder: SkillLevel[] = [
	"master",
	"proficient",
	"intermediary",
	"beginner",
];

type SkillCardProps = Skill;

const SkillCard = (props: SkillCardProps) => {
	return (
		<div
			onClick={() => {
				window.open(props.docs);
			}}
			className="card border-2 flex-row items-center justify-between relative">
			<div className="sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-8 lg:w-8">
				<img
					className="object-fit"
					alt={
						props.iconUrl
							? `icon for ${props.name}`
							: `placeholder icon`
					}
					src={
						props.iconUrl ??
						"https://icon-library.com/images/icon-placeholder/icon-placeholder-12.jpg"
					}
				/>
			</div>
			<h3 className="text-2xl ml-2 mr-auto">{props.name}</h3>
			<p className="">
				{props.level}|{props.category}
			</p>
		</div>
	);
};

type SortType = "asc" | "desc" | "level" | "level-asc";

const Skills = ({ skills }: { skills: Skill[] }) => {
	const [sortType, setSortType] = useState<SortType>("desc");
	const [sortedSkills, setSortedSkills] = useState<Skill[]>(
		() => skills
	);
	const List = () => (
		<ul className="flex flex-col gap-1 sm:h-52 md:h-96 lg:h-96 dark:border-slate-100 border-slate-700 overflow-y-auto scrollbar-thumb-slate-200 scrollbar-track-slate-100 px-5 py-2 gap-x-2 relative">
			{sortedSkills.map((skill, index) => (
				<li className={`sm:h-10 md:h-14 lg:h-16`} key={index}>
					<SkillCard {...skill} />
				</li>
			))}
		</ul>
	);

	const tabs = [
		"All",
		"Programming",
		"Styling",
		"Structure",
		"Database",
	].map((filter, index) => ({
		name: filter,
		content: <List />,
	}));

	useEffect(() => {
		switch (sortType) {
			case "desc":
				setSortedSkills(
					[...skills].sort((a, b) => {
						return a.name.localeCompare(b.name);
					})
				);
				break;
			case "level":
				setSortedSkills(
					[...skills].sort((a, b) => {
						const aLevel = a.level;
						const bLevel = b.level;

						return (
							skillLevelOrder.indexOf(aLevel) -
							skillLevelOrder.indexOf(bLevel)
						);
					})
				);
				break;
			case "level-asc":
				setSortedSkills(
					[...skills].sort((a, b) => {
						const aLevel = a.level;
						const bLevel = b.level;

						return (
							skillLevelOrder.indexOf(bLevel) -
							skillLevelOrder.indexOf(aLevel)
						);
					})
				);
				break;
			default:
				setSortedSkills(
					[...skills].sort((a, b) => {
						return b.name.localeCompare(a.name);
					})
				);
		}
	}, [skills, sortType]);

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const { value } = e.target;
		setSortType(value as SortType);
	};

	return (
		<div className="flex flex-col gap-2 border-2 border-slate-600">
			<div className="mt-4 p-2">
				<Tabs items={tabs} isVertical />
			</div>
			<p className="mx-auto my-0">
				Icons provided by{" "}
				<a className="link" href="https://devicon.dev/">
					DEVICON
				</a>
			</p>
		</div>
	);
};

export default Home;
