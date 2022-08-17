/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import path from "path";
import { readFileSync } from "fs";
import dynamic from "next/dynamic";
import { useState } from "react";
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

const DarkModeSwitch = dynamic(
	() => import("../components/DarkModeSwitch"),
	{ ssr: false }
);

const Contacts = () => {
	return (
		<div className="flex justify-center my-2 dark:bg-slate-800 bg-gray-200 rounded-md p-2">
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

const Sidebar = () => {
	return (
		<div className="flex flex-col gap-3 px-2 min-h-full sm:w-4/12 md:w-4/12 lg:w-3/12 border-r-2 border-red-200">
			<div className="flex flex-col gap-2 items-center">
				<img
					className="w-20 h-20 sm:w-16 sm:h-16 md:w-22 md:h-22 lg:w-32 lg:h-32 rounded-full"
					src="https://media-exp1.licdn.com/dms/image/C4E03AQHVJ8VM7ImT7A/profile-displayphoto-shrink_800_800/0/1649815425250?e=1666224000&v=beta&t=HvNR3OzymeOSzwb6pP3fZ5AAfXGZXn1mwoClmuu3tyA"
					alt="lucas guerra cardoso"
				/>
				<h1 className="text-xl lg:text-4xl md:text-3xl sm:text-2xl whitespace-nowrap">
					Lucas Guerra Cardoso
				</h1>
			</div>
			<Contacts />
			<ul className="flex flex-col w-full p-2 gap-1 text-md">
				<li className="flex w-full justify-between">
					<span>Resides In</span>
					<span>Porto, Portugal</span>
				</li>
				<li className="flex w-full justify-between">
					<span>Address</span>
					<span>Rua Da Breia, 67</span>
				</li>
				<li className="flex w-full justify-between">
					<span>Date Of Birth</span>
					<span>04/08/2000</span>
				</li>
				<li className="flex w-full justify-between">
					<span>Nationality</span>
					<span>Brazilian</span>
				</li>
			</ul>
		</div>
	);
};

const Projects = ({ projects }: { projects: Project[] }) => {
	return (
		<div className="flex flex-col gap-2">
			<ul className="grid grid-cols-3 grid-rows-2 border-2 m-1 border-slate-100 overflow-y-auto scrollbar-thumb-slate-200 scrollbar-track-slate-100 h-96 w-4/4 p-1 gap-x-2 gap-y-1">
				{projects.map((project, index) => (
					<li className="w-4/4 h-44" key={index}>
						<ProjectCard title={project.name} {...project} />
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
						className={`bg-slate-900 border-2 clickable w-28 text-center ${
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

const Navbar = () => {
	const isMobile = useBreakpoint();
	
	return (
		<nav className="flex justify-evenly">
			<div className="flex gap-2 ml-auto">
				<DarkModeSwitch />
				<select
					className={`dark:bg-slate-700 ${
						isMobile ? "w-20 px-2" : undefined
					} px-8 py-0`}
					name="language">
					<option value="en">
						{isMobile ? "en" : "English"}
					</option>
					<option value="pt">
						{isMobile ? "pt" : "Português"}
					</option>
				</select>
			</div>
		</nav>
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
	return (
		<div className="card">
			<a target={"_blank"} href={props.link} rel="noreferrer">
				<img src="" alt="" />
				<h3 className="text-2xl">{props.title}</h3>
				<p className="text-lg">{props.description}</p>
			</a>
			<button
				className="repo-btn"
				onClick={() => {
					window.open(props.repo);
				}}>
				<div className="flex w-full justify-between gap-4">
					<span>Repo</span>
					<FaGithub size={25} />
				</div>
			</button>
		</div>
	);
};

type Skill = {
	name: string;
	time: number;
};

type SkillCardProps = CardProps &
	Skill & {
		Icon: IconType;
	};

const SkillCard = (props: SkillCardProps) => {
	return <></>;
};

const Home = ({
	projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const tabs = [
		{
			name: "Projects",
			content: <Projects projects={projects} />,
		},
		{ content: <h1>item2</h1>, name: "Experience" },
		{ content: <h1>item3</h1>, name: "Skills" },
	];
	return (
		<>
			<Head>
				<title>Lucas Guerra Cardoso{"'"}s CV</title>
				<meta name="description" content="Thanks to t3-app!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header></header>
			<main className="flex mt-3 dark:text-gray-200 text-gray-700">
				<Sidebar />
				<div className="flex flex-col w-full ml-3">
					<div className="ml-auto p-2">
						<Navbar />
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
			<footer className="w-full mt-auto p-4">
				<a
					className="text-lg"
					href="https://github.com/FooOperator/online-curriculum">
					Check out the repo for this site
				</a>
			</footer>
		</>
	);
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
	const filePath = path.join(
		process.cwd(),
		"src",
		"data",
		"projects.json"
	);
	const data = readFileSync(filePath);
	// @ts-ignore
	const projects = JSON.parse(data);

	return {
		props: { projects: projects as Project[] },
	};
};

export default Home;
