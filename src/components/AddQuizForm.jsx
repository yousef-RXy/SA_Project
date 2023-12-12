import React, { useState } from 'react';

const AddQuizForm = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [correctOption, setCorrectOption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted:', { quizTitle, question, options, correctOption });

    setQuizTitle('');
    setQuestion('');
    setOptions(['', '', '']);
    setCorrectOption('');
  };

  return (


    <>
    <div className="container-fluid align-content-center">
  
            <div className="row align-content-center">

                <div className="col-md-5 QuizeesSection example">
                    <h2 className="sectionTitle"><i className="fas fa-graduation-cap"></i> Add Quiz</h2>


                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                        <label htmlFor="quizTitle" className="form-label"> Quiz Title: </label>
                        <input
                          type="text"
                          className="form-control"
                          id="quizTitle"
                          value={quizTitle}
                          onChange={(e) => setQuizTitle(e.target.value)}
                        />
                        </div>

        
                        <div className="mb-3">
                          <label htmlFor="question" className="form-label">
                            Question:
                          </label>
                          <textarea
                            className="form-control"
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="options" className="form-label">
                            Options:
                          </label>
                          {options.map((option, index) => (
                            <div key={index} className="mb-2">
                              <input
                                type="text"
                                className="form-control"
                                value={option}
                                onChange={(e) => {
                                  const updatedOptions = [...options];
                                  updatedOptions[index] = e.target.value;
                                  setOptions(updatedOptions);
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="correctOption" className="form-label">
                            Correct Option:
                          </label>
                          <select
                            className="form-select"
                            value={correctOption}
                            onChange={(e) => setCorrectOption(e.target.value)}
                          >
                            {options.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>


                        <button type="submit" className="transition-all mx-3 px-3 text-lg text-white rounded-xl bg-[#005cc8] hover:bg-[#004a9e]"> Submit </button>
                    </form>
  
                </div>


            </div>
    </div>
    </>
    
  );
};

export default AddQuizForm;
