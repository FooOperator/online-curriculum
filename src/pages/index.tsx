/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import projects_data from "../data/projects.json";
import { Alert } from "flowbite-react";
import DarkModeSwitch from "../components/DarkModeSwitch";

function Navbar() {
	return (
		<nav className="flex justify-evenly p-2">
			<div className="ml-auto">
				<DarkModeSwitch />
				<select name="language">
					<option value="en">English</option>
					<option value="en">Português</option>
					<option value="en">English</option>
					<option value="en">English</option>
				</select>
			</div>
		</nav>
	);
}

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Lucas Guerra Cardoso{"'"}s CV</title>
				<meta name="description" content="Thanks to t3-app!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="dark:text-slate-50 dark:bg-slate-900">
				<header>
					<Navbar />
				</header>
				<main className="min-h-screen p-2 ">
					<div className="flex flex-col items-center w-100">
						<img
							className="w-30 h-30 rounded-full"
							src="https://media-exp1.licdn.com/dms/image/C4E03AQHVJ8VM7ImT7A/profile-displayphoto-shrink_200_200/0/1649815425250?e=1665619200&v=beta&t=UinyUrL-qyhU-raXsulfa3APgbKijpkLEKKIGkbw6do"
							alt="Lucas Guerra Cardoso's Avatar"
						/>
						<h2 className="text-4xl">Lucas Guerra Cardoso</h2>
						<p></p>
					</div>
					<Section name="projects">
						<ul className="grid w-full p-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2">
							{projects_data.map((project_data, index) => (
								<li className="" key={index}>
									<ProjectCard
										title={project_data.name}
										repo={project_data.repo}
										link={project_data.link}
										description={
											project_data.description
										}
									/>
								</li>
							))}
						</ul>
					</Section>
					<Section name="skills">
						<p></p>
					</Section>
				</main>
				<footer>
					<div>
						<h5>Relevant Links</h5>
						<a href="">Repo</a>
						<a href=""></a>
					</div>
				</footer>
			</div>
		</>
	);
};

type CardProps = {
	title: string;
	description: string;
};

type ProjectCardProps = CardProps & {
	link: string;
	repo: string;
};

const ProjectCard = (props: ProjectCardProps) => {
	return (
		<a target={"_blank"} href={props.link} rel="noreferrer">
			<div className="flex flex-col h-full cursor-pointer gap-1 border-4 p-2 dark:bg-slate-700">
				<img src="" alt="" />
				<h3 className="text-2xl">{props.title}</h3>
				<p className="text-lg">{props.description}</p>
				<small className="text-sm mt-auto underline self-center hover:text-blue-600">
					<a
						target={"_blank"}
						href={props.repo}
						onClick={(e) => {
							e.stopPropagation();
						}}
						rel="noreferrer">
						Go To Repo
					</a>
				</small>
			</div>
		</a>
	);
};

type SectionProps = {
	name: string;
	children: React.ReactNode;
};

const Section = ({ children, name }: SectionProps) => {
	return (
		<section className="p-4" id={name}>
			<h2 className="text-3xl">
				{name.charAt(0).toUpperCase() + name.slice(1)}
			</h2>
			<hr className="my-2" />
			{children}
		</section>
	);
};

export default Home;
