import React, { useState, useEffect, useRef } from "react";
import { Box, Container } from "@mui/system";

function ToDoList() {
  const storageList = JSON.parse(localStorage.getItem('jobs')) || [];

  const [job, setJob] = useState('');
  const [jobs, setJobs] = useState(storageList);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (job.trim()) {
      setJobs(prev => {
        const newJobs = [...prev, job];
        localStorage.setItem('jobs', JSON.stringify(newJobs));
        return newJobs;
      });
      setJob('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          border: 0,
          borderColor: 'secondary.main',
          borderRadius: '16px',
          padding: 2,
          marginTop: 2,
        }}
      >
        <input
          ref={inputRef} 
          value={job}
          onChange={e => setJob(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
        <button onClick={handleSubmit}>Add</button>
        <ol> 
          {jobs.map((job, index) => (
            <li key={index}> {job}</li>
          ))}
        </ol>
      </Box>
    </Container>
  );
}

export default ToDoList;
