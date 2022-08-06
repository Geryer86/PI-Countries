import React from "react";
import "./styles/Pagination.css"
import { useSelector } from "react-redux";

export default function Pagination({ limit, page, pagination }) {

  const noLimitCt = useSelector((state) => state.countriesNL)
  
  const pageNumbers = [];
  const pageNum5 = []
  const currentPage = (page / limit) + 1
  const pageQty = limit>0?Math.ceil(noLimitCt.length / limit):1

  for (let i = 1; i <= pageQty; i++) {
    pageNumbers.push(i)
  }

  for (let j = currentPage; j < currentPage + 5; j++) {
    if (j > 1 && j < pageQty) {
      pageNum5.push(pageNumbers[j - 1])
    }
  }

  return (
    <div className='paginado'>
      {
        <ul>
          <button disabled={currentPage<2} onClick={() => pagination(currentPage - 1)}>PREV</button>
          {
            <button onClick={() => pagination(1)}>{1}</button>
          }
          {
            pageNum5.map(number => {
              return (
                <button onClick={() => pagination(number)}>{number}</button>
            )})
          }
          {
            <button onClick={() => pagination(pageNumbers.length)}>{pageNumbers.length}</button>
          }
          <button disabled={currentPage>=pageQty} onClick={() => pagination(currentPage + 1)}>NEXT</button>
        </ul>
      }
    </div>
  )
}
