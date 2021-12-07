import React, { useState, useEffect } from "react";
import Job from "./Job";

// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";

function App() {
  // declaring state variables
  const [loading, setloading] = useState(true);
  const [jobs, setjobs] = useState([]);
  const [value, setvalue] = useState(1);

  // fetching jobs from api
  const fetchJobs = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setjobs(data);
    // once jobs are fetched we no longer display "Loading..."
    setloading(false);
  };

  // useEffect is used to only fetch jobs at the initial rendering
  useEffect(() => {
    fetchJobs();
  }, []);

  console.log(jobs);

  // if loading is true -> display Loading until jobs are fetched
  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    );
  }

  const { company, dates, duties, title } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {/* return buttons by iterating through jobs list and getting the company name */}
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                // if job button is pressed, its class will be changed to job-btn active-btn
                className={`job-btn ${index === value && "active-btn"}`}
                // if clicked, `value` is changed to the index of the job, this value is passed to Job component
                onClick={(index) => setvalue(index)}
              >
                {item.company}
              </button>
            );
          })}
        </div>
        {/* Job component receives a job object from the jobs list */}
        <Job company={company} dates={dates} duties={duties} title={title} />
      </div>
    </section>
  );
}

export default App;
