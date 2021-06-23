import React from 'react'
import { Button } from 'react-bootstrap'
import './Pagination.css'

const Pagination = ({ page, pages, changePage }) => {
    let middlePagination;
    if (pages <= 5) {
        middlePagination = [...Array(pages)].map((_, index) => (
            <Button key={index + 1}
                onClick={() => changePage(index + 1)}
                disabled={page === index + 1}>
                {index + 1}
            </Button>
        ))
    } else {
        const startValue = Math.floor((page - 1) / 5) * 5;

        middlePagination = (
            <>
                {[...Array(5)].map((_, index) => (
                    <Button
                        key={startValue + index + 1}
                        disabled={pages === startValue + index + 1}
                        onClick={() => changePage(startValue + index + 1)}
                    >
                        {startValue + index + 1}
                    </Button>
                ))
                }
                <Button>...</Button>
                <Button onClick={() => changePage(pages)}>{pages}</Button>
            </>
        )

        if (page > 5) {
            if (pages - page >= 5) {
                middlePagination = (
                    <>
                        <Button onClick={() => changePage(1)}>1</Button>
                        <Button>...</Button>
                        <Button onClick={() => changePage(startValue)}>{startValue}</Button>
                        {[...Array(5)].map((_, index) => (
                            <Button
                                key={startValue + index + 1}
                                disabled={pages === startValue + index + 1}
                                onClick={() => changePage(startValue + index + 1)}
                            >
                                {startValue + index + 1}
                            </Button>
                        ))
                        }
                        <Button>...</Button>
                        <Button onClick={() => changePage(pages)}>{pages}</Button>
                    </>
                )
            } else {
                middlePagination = (
                    <>
                        <Button onClick={() => changePage(1)}>1</Button>
                        <Button>...</Button>
                        <Button onClick={() => changePage(startValue)}>{startValue}</Button>
                        {[...Array(5)].map((_, index) => (
                            <Button
                                key={startValue + index + 1}
                                style={pages < startValue + index + 1 ? {display:"none"} : null }
                                disabled={pages === startValue + index + 1}
                                onClick={() => changePage(startValue + index + 1)}
                            >
                                {startValue + index + 1}
                            </Button>
                        ))
                        }
                    </>
                )
            }

        }
    }

    return pages > 1 && (
        <div className="pagination">
            <Button className="pagination_prev"
                onClick={() => changePage(page => page - 1)}
                disabled={page === 1}>
                &#171;
            </Button>
            {middlePagination}
            <Button className="pagination_next"
                onClick={() => changePage(page => page + 1)}
                disabled={page === pages}>&#187;
            </Button>
        </div>
    )
}

export default Pagination