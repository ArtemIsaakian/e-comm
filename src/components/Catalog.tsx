import Card from "./Card";
import {FC, useState} from "react";
import { baseAPI } from "../services/BaseService.ts";

const Catalog: FC = () => {
  const [page, setPage] = useState(1);
  const { data: catalog, isLoading, error } = baseAPI.useGetCatalogQuery({page});
  const handleNextPage = () => {
    let currentPage = catalog.meta.current_page;
    const totalPages = catalog.meta.total_pages;
    if (currentPage < totalPages) {
      setPage(++currentPage)
    }
  }
  const handlePrevPage = () => {
    let currentPage = catalog.meta.current_page;
    if (currentPage > 1) {
      setPage(--currentPage)
    }
  }

  return (
    <section className="catalog">
      <div className="catalog__container">
        <div className="title-page">
          <h2>Все кроссовки</h2>
        </div>
        <div className="catalog__items">
          {error ? (
              <>Error message here...</>
          ) : isLoading ? (
              <>Loading...</>
          ) : catalog ? catalog.items.map((card: any) => <Card key={card.id} card={card} />)
           : null}
        </div>
        <div className="catalog__navigation">
          <button className="catalog__prev-btn" onClick={handlePrevPage}></button>
          <button className="catalog__next-btn" onClick={handleNextPage}></button>
        </div>
      </div>
    </section>
  )
}

export default Catalog;
