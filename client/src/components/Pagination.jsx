import React from "react";
import "./styles/Pagination.css"
import { useSelector } from "react-redux";

export default function Pagination({ limit, page, pagination }) {

  const noLimitCt = useSelector((state) => state.countriesNL)

  const pageNum5 = []
  const currentPage = (page / limit) + 1
  const pageQty = limit>0?Math.ceil(noLimitCt.length / limit):1

  for (let j = currentPage - 2; j < currentPage + 3; j++) {
    if (j > 1 && j < pageQty) {
      pageNum5.push(j)
    }
  }

  return (
    <div className='paginado'>
      {
        <ul>
          <button className='prevNext' disabled={currentPage<2} onClick={() => pagination(currentPage - 1)}>PREV</button>
          {
            <button className={currentPage===1?'PagActive':'PagInactive'} onClick={() => pagination(1)}>{1}</button>
          }
          {
            pageNum5.map(number => {
              let current = (currentPage === number)
              return (
                <button className={current?'PagActive':'PagInactive'} onClick={() => pagination(number)}>{number}</button>
              )
            })
          }
          {
            <button className={currentPage===pageQty?'PagActive':'PagInactive'} onClick={() => pagination(pageQty)}>{pageQty}</button>
          }
          <button className='prevNext' disabled={currentPage>=pageQty} onClick={() => pagination(currentPage + 1)}>NEXT</button>
        </ul>
      }
    </div>
  )
}
