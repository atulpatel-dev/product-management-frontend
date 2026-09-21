import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
    deleteProduct,
    getProducts,
} from "../../api/productApi";

import ProductCard from "../../components/ProductCard/ProductCard";

import "./Products.css";

const DEFAULT_SORT = "-createdAt";
const DEFAULT_PAGE = 1;
const PRODUCTS_PER_PAGE = 6;

export default function Products() {

    const [searchParams, setSearchParams] = useSearchParams();

    /*
     * URL → state
     *
     * The URL is the source of truth for filters.
     */
    const urlSearch = searchParams.get("search") || "";

    const urlMinPrice =
        searchParams.get("minPrice") || "";

    const urlMaxPrice =
        searchParams.get("maxPrice") || "";

    const urlSort =
        searchParams.get("sort") || DEFAULT_SORT;

    const urlPage = Math.max(
        Number(searchParams.get("page")) || DEFAULT_PAGE,
        DEFAULT_PAGE
    );

    const [searchInput, setSearchInput] =
        useState(urlSearch);

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [deleteId, setDeleteId] = useState(null);

    const [pagination, setPagination] = useState({
        totalProduct: 0,
        totalPages: 0,
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
    });

    /*
     * Keep search input synchronized with URL.
     *
     * This also makes browser Back/Forward work correctly.
     */
    useEffect(() => {
        setSearchInput(urlSearch);
    }, [urlSearch]);

    /*
     * Debounced search.
     *
     * Wait 400ms after typing stops before changing URL.
     */
    useEffect(() => {

        const timer = setTimeout(() => {

            if (searchInput === urlSearch) {
                return;
            }

            const params = new URLSearchParams(
                searchParams
            );

            if (searchInput.trim()) {
                params.set(
                    "search",
                    searchInput.trim()
                );
            } else {
                params.delete("search");
            }

            params.delete("page");

            setSearchParams(params);

        }, 400);

        return () => clearTimeout(timer);

    }, [
        searchInput,
        urlSearch,
        searchParams,
        setSearchParams,
    ]);

    /*
     * Load products whenever URL filters change.
     */
    useEffect(() => {

        let cancelled = false;

        async function loadProducts() {

            try {

                setLoading(true);
                setError("");

                const data = await getProducts({
                    search: urlSearch,
                    minPrice: urlMinPrice,
                    maxPrice: urlMaxPrice,
                    sort: urlSort,
                    page: urlPage,
                    limit: PRODUCTS_PER_PAGE,
                });

                if (cancelled) {
                    return;
                }

                setProducts(data.data || []);

                setPagination({
                    totalProduct:
                        data.totalProduct || 0,

                    totalPages:
                        data.totalPages || 0,

                    currentPage:
                        data.currentPage || 1,

                    hasNextPage:
                        data.hasNextPage || false,

                    hasPreviousPage:
                        data.hasPreviousPage || false,
                });

            } catch (error) {

                if (cancelled) {
                    return;
                }

                setError(
                    error.message ||
                    "Failed to load products"
                );

                setProducts([]);

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadProducts();

        return () => {
            cancelled = true;
        };

    }, [
        urlSearch,
        urlMinPrice,
        urlMaxPrice,
        urlSort,
        urlPage,
    ]);

    function updateFilter(name, value) {

        const params = new URLSearchParams(
            searchParams
        );

        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }

        params.delete("page");

        setSearchParams(params);
    }

    function handleMinPriceChange(event) {

        updateFilter(
            "minPrice",
            event.target.value
        );
    }

    function handleMaxPriceChange(event) {

        updateFilter(
            "maxPrice",
            event.target.value
        );
    }

    function handleSortChange(event) {

        updateFilter(
            "sort",
            event.target.value === DEFAULT_SORT
                ? ""
                : event.target.value
        );
    }

    function handlePageChange(newPage) {

        const params = new URLSearchParams(
            searchParams
        );

        if (newPage <= 1) {
            params.delete("page");
        } else {
            params.set("page", String(newPage));
        }

        setSearchParams(params);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    function clearFilters() {

        setSearchInput("");

        setSearchParams({});
    }

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setDeleteId(id);
            setError("");

            await deleteProduct(id);

            /*
             * Reload current URL state.
             */
            const data = await getProducts({
                search: urlSearch,
                minPrice: urlMinPrice,
                maxPrice: urlMaxPrice,
                sort: urlSort,
                page: urlPage,
                limit: PRODUCTS_PER_PAGE,
            });

            setProducts(data.data || []);

            setPagination({
                totalProduct:
                    data.totalProduct || 0,

                totalPages:
                    data.totalPages || 0,

                currentPage:
                    data.currentPage || 1,

                hasNextPage:
                    data.hasNextPage || false,

                hasPreviousPage:
                    data.hasPreviousPage || false,
            });

        } catch (error) {

            setError(
                error.message ||
                "Failed to delete product"
            );

        } finally {

            setDeleteId(null);
        }
    }

    const hasFilters =
        Boolean(
            urlSearch ||
            urlMinPrice ||
            urlMaxPrice ||
            urlSort !== DEFAULT_SORT ||
            urlPage > 1
        );

    return (
        <section className="products-page">

            <div className="products-header">

                <div>
                    <p className="products-eyebrow">
                        Product Management
                    </p>

                    <h1>Products</h1>

                    <p>
                        Manage your product catalog.
                    </p>
                </div>

                <Link
                    to="/add-product"
                    className="add-product-button"
                >
                    + Add Product
                </Link>

            </div>

            <div className="products-toolbar">

                <div className="product-search-group">

                    <label htmlFor="product-search">
                        Search
                    </label>

                    <input
                        id="product-search"
                        type="search"
                        placeholder="Search products..."
                        value={searchInput}
                        onChange={(event) =>
                            setSearchInput(
                                event.target.value
                            )
                        }
                    />

                </div>

                <div className="product-filter-group">

                    <div>
                        <label htmlFor="min-price">
                            Min Price
                        </label>

                        <input
                            id="min-price"
                            type="number"
                            min="0"
                            placeholder="₹0"
                            value={urlMinPrice}
                            onChange={
                                handleMinPriceChange
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="max-price">
                            Max Price
                        </label>

                        <input
                            id="max-price"
                            type="number"
                            min="0"
                            placeholder="₹10000"
                            value={urlMaxPrice}
                            onChange={
                                handleMaxPriceChange
                            }
                        />
                    </div>

                </div>

                <div className="product-sort-group">

                    <label htmlFor="product-sort">
                        Sort By
                    </label>

                    <select
                        id="product-sort"
                        value={urlSort}
                        onChange={handleSortChange}
                    >
                        <option value="-createdAt">
                            Newest
                        </option>

                        <option value="createdAt">
                            Oldest
                        </option>

                        <option value="title">
                            Name: A-Z
                        </option>

                        <option value="-title">
                            Name: Z-A
                        </option>

                        <option value="price">
                            Price: Low to High
                        </option>

                        <option value="-price">
                            Price: High to Low
                        </option>
                    </select>

                </div>

                <button
                    type="button"
                    className="clear-filters-button"
                    onClick={clearFilters}
                    disabled={!hasFilters}
                >
                    Clear
                </button>

            </div>

            {error && (
                <div className="products-error">
                    <p>{error}</p>
                </div>
            )}

            <div className="products-result-info">

                <span>
                    {pagination.totalProduct}{" "}
                    {pagination.totalProduct === 1
                        ? "product"
                        : "products"}
                </span>

                {loading && (
                    <span className="products-loading-text">
                        Updating...
                    </span>
                )}

            </div>

            {loading && products.length === 0 ? (

                <div className="products-grid">

                    {Array.from({
                        length: PRODUCTS_PER_PAGE,
                    }).map((_, index) => (

                        <div
                            className="product-skeleton"
                            key={index}
                        >
                            <div className="skeleton-image"></div>

                            <div className="skeleton-content">
                                <div className="skeleton-line large"></div>
                                <div className="skeleton-line"></div>
                                <div className="skeleton-line short"></div>
                            </div>
                        </div>

                    ))}

                </div>

            ) : products.length === 0 ? (

                <div className="products-empty">

                    <div className="products-empty-icon">
                        📦
                    </div>

                    <h2>No products found</h2>

                    <p>
                        Try changing your search or filters.
                    </p>

                    <button
                        type="button"
                        className="clear-filters-button"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>

                </div>

            ) : (

                <>
                    <div
                        className={`products-grid ${
                            loading
                                ? "products-grid-loading"
                                : ""
                        }`}
                    >

                        {products.map((product) => (

                            <ProductCard
                                key={product._id}
                                product={product}
                                onDelete={handleDelete}
                                deleteId={deleteId}
                            />

                        ))}

                    </div>

                    {pagination.totalPages > 1 && (

                        <div className="products-pagination">

                            <button
                                type="button"
                                disabled={
                                    !pagination.hasPreviousPage ||
                                    loading
                                }
                                onClick={() =>
                                    handlePageChange(
                                        urlPage - 1
                                    )
                                }
                            >
                                ← Previous
                            </button>

                            <span>
                                Page{" "}
                                <strong>
                                    {pagination.currentPage}
                                </strong>{" "}
                                of{" "}
                                <strong>
                                    {pagination.totalPages}
                                </strong>
                            </span>

                            <button
                                type="button"
                                disabled={
                                    !pagination.hasNextPage ||
                                    loading
                                }
                                onClick={() =>
                                    handlePageChange(
                                        urlPage + 1
                                    )
                                }
                            >
                                Next →
                            </button>

                        </div>

                    )}
                </>

            )}

        </section>
    );
}