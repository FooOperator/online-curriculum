/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import path from "path";
import { readFileSync } from "fs";
import dynamic from "next/dynamic";
import React, { SelectHTMLAttributes, useState } from "react";
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

const Projects = ({ projects }: { projects: Project[] }) => {
	return (
		<div className="flex flex-col gap-2">
			<ul className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 border-2 m-1 dark:border-slate-100 border-slate-700 overflow-y-auto scrollbar-thumb-slate-200 scrollbar-track-slate-100 h-96 w-4/4 p-1 gap-x-2 gap-y-1">
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

const Skills = ({ skills }: { skills: Skill[] }) => {
	return (
		<div className="flex flex-col gap-2">
			<ul className="grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 border-2 m-1 dark:border-slate-100 border-slate-700 overflow-y-auto scrollbar-thumb-slate-200 scrollbar-track-slate-100 h-96 w-4/4 p-1 gap-x-2">
				{skills.map((skill, index) => (
					<li
						className="w-4/4 sm:h-10 md:h-14 lg:h-16"
						key={index}>
						<SkillCard {...skill} />
					</li>
				))}
			</ul>
		</div>
	);
};

type Tab = {
	name: string;
	content: JSX.Element;
};

type TabsProps = {
	items: Tab[];
	defaultIndex?: number;
};

const Tabs = ({ items, defaultIndex }: TabsProps) => {
	const [currentIndex, setCurrentIndex] = useState<number>(
		defaultIndex ?? 0
	);
	const handleSelectTab = (index: number) => {
		setCurrentIndex(index);
	};
	return (
		<>
			<ul className="flex gap-1 w-full justify-center">
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
			<>{items[currentIndex]?.content}</>
		</>
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
			className="card relative"
			onMouseEnter={() => setIsOverCard(true)}
			onMouseLeave={() => setIsOverCard(false)}>
			<a target={"_blank"} href={props.link} rel="noreferrer">
				<img src="" alt="" />
				<h3 className="text-2xl">{props.title}</h3>
				<p className="">{props.description}</p>
			</a>
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

type Skill = {
	name: string;
	time: [number, "years" | "months"];
};

type SkillCardProps = CardProps & Omit<Skill, "title" | "description">;

const SkillCard = (props: SkillCardProps) => {
	return (
		<div className="card flex-row items-center justify-between relative">
			<img src="" alt="" />
			<h3 className="text-2xl mr-auto">{props.name}</h3>
			<p className="">{props.description}</p>
			<p className="">
				{props.time[0]} {props.time[1] ?? "Years"}
			</p>
		</div>
	);
};

const Home = ({
	projects,
	skills,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const tabs = [
		{
			name: "Projects",
			content: <Projects projects={projects} />,
		},
		{
			name: "Experience",
			content: <h1>item2</h1>,
		},
		{
			name: "Skills",
			content: <Skills skills={skills} />,
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
			<footer className="mt-auto py-5 px-2">
				<a
					className="link"
					href="https://github.com/FooOperator/online-curriculum">
					Check out the repo for this site
				</a>
			</footer>
		</>
	);
};

export const getStaticProps = async ({ locale }) => {
	const filePathProj = path.join(
		process.cwd(),
		"src",
		"data",
		"projects.json"
	);
	const filePathSkills = path.join(
		process.cwd(),
		"src",
		"data",
		"skills.json"
	);
	const dataProj = readFileSync(filePathProj);
	const dataSkills = readFileSync(filePathSkills);

	// @ts-ignore
	const skills = JSON.parse(dataSkills);
	// @ts-ignore
	const projects = JSON.parse(dataProj);

	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])),
			projects: projects as Project[],
			skills: skills as Skill[],
		},
	};
};

export default Home;
