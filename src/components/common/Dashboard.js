import React from "react";
import { FaBriefcase, FaEdit, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EMPLOYER_ROLE } from "../../utils/constant";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const role = user?.role;
  const id = user?._id;

  const dashboardCardsForEmployer = [
    {
      title: "My Job Postings",
      desc: "View the list of jobs you have created.",
      icon: <FaBriefcase fontSize={"2rem"} className="mr-4" />,
      route: "/employer-jobs",
    },
    {
      title: "Create Job Posting",
      desc: "Create new job posting with all your requirements",
      icon: <FaEdit fontSize={"2rem"} className="mr-4" />,
      route: "/create-job",
    },
  ];

  const dashboardCardsForFreelancer = [
    {
      title: "Find Jobs",
      desc: "Check out all the suitable jobs.",
      icon: <FaBriefcase fontSize={"2rem"} className="mr-4" />,
      route: "/jobListing",
    },
    {
      title: "View Profile",
      desc: "Check how your profile looks like",
      icon: <FaEdit fontSize={"2rem"} className="mr-4" />,
      route: `/profile/${id}`,
    },
    {
      title: "Update Profile ",
      desc: "Update your profile",
      icon: <FaUser fontSize={"2rem"} className="mr-4" />,
      route: "/profile",
    },
  ];

  const dashoboardCards =
    role === EMPLOYER_ROLE
      ? dashboardCardsForEmployer
      : dashboardCardsForFreelancer;

  return (
    <div className="grow lg:ml-16 sm:ml-8 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="mb-6 mt-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {dashoboardCards.map((card) => (
          <Link
            to={card.route}
            key={card.route}
            className="block p-4 bg-white rounded-lg shadow-md hover:bg-slate-400 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              {card.icon} {card.title}
            </h2>
            <p>{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
