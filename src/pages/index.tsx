/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import path from "path";
import { readFileSync } from "fs";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
	FaGithub,
	FaPhoneSquareAlt,
	FaGithubSquare,
	FaLinkedin,
	FaEnvelopeSquare,
} from "react-icons/fa";
import { IconType } from "react-icons";
import useBreakpoint from "../hooks/useBreakpoint";

const DarkModeSwitch = dynamic(
	() => import("../components/DarkModeSwitch"),
	{ ssr: false }
);

const PersonalInformation = () => {
	const isMobile = useBreakpoint();
	return (
		<div className="flex sm:flex-row md:flex-row lg:flex-row  items-center w-100 gap-2">
			<img
				className="w-16 h-30 sm:w-30 md:w-30 lg:w-30 rounded-full"
				src="https://media-exp1.licdn.com/dms/image/C4E03AQHVJ8VM7ImT7A/profile-displayphoto-shrink_200_200/0/1649815425250?e=1665619200&v=beta&t=UinyUrL-qyhU-raXsulfa3APgbKijpkLEKKIGkbw6do"
				alt="Lucas Guerra Cardoso's Avatar"
			/>
			<div className="flex flex-col">
				<h2
					className={`text-center ${
						isMobile ? "text-xl whitespace-nowrap" : "text-4xl"
					}`}>
					Lucas Guerra Cardoso
				</h2>
				<Contacts />
			</div>
		</div>
	);
};

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

type ArticleProps = {
	title: string;
	children: JSX.Element[] | JSX.Element;
};

const Article = ({ title, children }: ArticleProps) => {
	return (
		<article>
			<h2 className="text-3xl">{title}</h2>
			{children}
		</article>
	);
};

const Home = ({
	projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<>
			<Head>
				<title>Lucas Guerra Cardoso{"'"}s CV</title>
				<meta name="description" content="Thanks to t3-app!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="py-3 bg-slate-900">
				<div className="bg-slate-100 text-slate-900 dark:text-slate-50 dark:bg-slate-800">
					<header>
						<Navbar />
					</header>
					<main className="min-h-screen p-2 text-center sm:text-left md:text-left lg:text-left">
						<PersonalInformation />
						<div className="grid grid-cols-3 gap-2 p-4">
							<Article title="About">
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Beatae expedita iure
									nesciunt numquam repellat possimus
									corporis dolorem ipsa, eveniet
									consequatur, ut molestias. Dicta, odio
									quod tenetur enim impedit voluptates
									dolor.
								</p>
								<p>
									Lorem, ipsum dolor sit amet consectetur
									adipisicing elit. Nam cumque impedit,
									natus nisi, dolores rerum sapiente
									suscipit eveniet quisquam esse
									consequuntur temporibus recusandae
									quidem quaerat! Culpa maiores excepturi
									dolor blanditiis!
								</p>
								<p>
									Lorem ipsum dolor sit amet consectetur
									adipisicing elit. Quae soluta fugiat
									asperiores earum corporis sequi esse
									qui nostrum est? Distinctio quidem
									aliquid quasi consequuntur totam atque!
									Id illum deserunt doloremque!
								</p>
							</Article>
							<Article title="Skills">
								skills go here
							</Article>
							<Article title="Projects">
								<div className="overflow-scroll">
									{projects.map((project, index) => (
										<ProjectCard
											key={index}
											description={
												project.description
											}
											link={project.link}
											repo={project.repo}
											title={project.name}
										/>
									))}
								</div>
							</Article>
						</div>
					</main>
					<footer className="w-full p-4">
						<a
							className="text-lg"
							href="https://github.com/FooOperator/online-curriculum">
							Check out the repo for this site
						</a>
					</footer>
				</div>
			</div>
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
	const projects = JSON.parse(data);

	return {
		props: { projects: projects as Project[] },
	};
};

const Navbar = () => {
	const isMobile = useBreakpoint();
	return (
		<nav className="flex justify-evenly p-2">
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
				className={`hover:text-gray-700 dark:hover:text-gray-300`}
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
		<div className="flex flex-col h-full cursor-pointer gap-1 border-4 p-2 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-900">
			<a target={"_blank"} href={props.link} rel="noreferrer">
				<img src="" alt="" />
				<h3 className="text-2xl">{props.title}</h3>
				<p className="text-lg">{props.description}</p>
			</a>
			<button
				className="w-32 px-2 py-2 bg-blue-300 dark:bg-blue-700 hover:bg-blue-500 dark:hover:bg-blue-900 rounded-lg ml-auto mt-auto mb-2"
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

type SectionProps = {
	name: string;
	children: React.ReactNode;
};

const Section = ({ children, name }: SectionProps) => {
	return (
		<section className="p-4" id={name.split(" ").join("-")}>
			<h2 className="text-3xl">
				{name.charAt(0).toUpperCase() + name.slice(1)}
			</h2>
			<hr className="my-2" />
			<>{children}</>
		</section>
	);
};

export default Home;
