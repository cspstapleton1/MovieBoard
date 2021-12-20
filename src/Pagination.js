import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Movie from './App'

function Pagination({ data, RenderComponent, title, pageLimit, dataLimit}){
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
  
    function goToNextPage() {
      setCurrentPage((page) => page + 1);
    }
  
    function goToPreviousPage() {
      setCurrentPage((page) => page - 1);
    }
  
    function changePage(event){
      const pageNumber = Number(event.target.textContent);
      setCurrentPage(pageNumber);
    }
  
    const getPaginatedData = () => {
      const startIndex = currentPage * dataLimit - dataLimit;
      const endIndex = startIndex + dataLimit;
      return data.slice(startIndex, endIndex);
    };
  
    const getPaginationGroup = () => {
      let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
      return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };
  
    return(
      <div>
    <div className="dataContainer">
      {getPaginatedData().map((d, idx) => (
        <RenderComponent key={idx} data={d} />
      ))}
    </div>
  
  
      <div className="pagination">
        <button onClick={goToPreviousPage} 
        className={`prev ${currentPage === 1 ? 'disabled' : ''}`}>
        prev
        </button>
  
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? 'active' : null}`}
          >
            <span>{item}</span>
          </button>
        ))}
        
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? 'disabled' : ''}`}>
          next
        </button>
      </div>
      
      </div>
    );
  }


  export default function Paginate() {
    const [movie, setMovie] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: '0px' });
    }, []);
  
    if (error) return <h1>{error}</h1>;
  
    return (
      <div>
        {movie.length > 0 ? (
          <>
            <Pagination
              data={movie}
              RenderComponent={Movie}
              title="Movies"
              pageLimit={5}
              dataLimit={10}
            />
          </>
        ) : (
         <h1>No movies to display</h1>
        )}
      </div>
    );
  }
