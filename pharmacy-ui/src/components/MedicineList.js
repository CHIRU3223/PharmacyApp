import React, { useState, useMemo } from "react";
const MedicineList = ({ medicines, searchText }) => {
    const [sortKey, setSortKey] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const formatDate = (d) => {
        if (!d && d !== 0) return "";
        try {
            const date = new Date(d);
            if (isNaN(date.getTime())) return String(d);
            return date.toLocaleDateString("en-GB");
        } catch (e) {
            return String(d);
        }
    };
    const filteredMedicines = (medicines || []).filter(m =>
        m.name.toLowerCase().includes((searchText || "").toLowerCase())
    );

    const sortedFilteredMedicines = useMemo(() => {
        const arr = [...filteredMedicines];
        if (!sortKey) return arr;

        arr.sort((a, b) => {
            const key = sortKey;
            // Name & Brand sorting
            if (key === "name" || key === "brand") {
                const va = ((a[key] || "") + "").toString().toLowerCase();
                const vb = ((b[key] || "") + "").toString().toLowerCase();
                if (va < vb) return sortOrder === "asc" ? -1 : 1;
                if (va > vb) return sortOrder === "asc" ? 1 : -1;
                return 0;
            }

            //expiryDate sorting
            if (key === "expiryDate") {
                let va = new Date(a.expiryDate).getTime();
                let vb = new Date(b.expiryDate).getTime();
                if (isNaN(va)) va = 0;
                if (isNaN(vb)) vb = 0;
                return sortOrder === "asc" ? va - vb : vb - va;
            }

            // quantity & price sorting
            let va = Number(a[key]);
            let vb = Number(b[key]);
            if (isNaN(va)) va = 0;
            if (isNaN(vb)) vb = 0;
            return sortOrder === "asc" ? va - vb : vb - va;
        });

        return arr;
    }, [filteredMedicines, sortKey, sortOrder]);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };
    const getRowStyle = (medicine) => {
        const daysToExpire =
            (new Date(medicine.expiryDate) - new Date()) / (1000 * 60 * 60 * 24);

        if (daysToExpire < 30) return { backgroundColor: "red" };
        if (medicine.quantity < 10) return { backgroundColor: "yellow" };
        return {};
    };
    return (
        <div>
            {
                sortedFilteredMedicines.length > 0 && <>
                    <style>{`
                        .sortable { cursor: pointer; user-select: none; }
                        .sortable:hover { text-decoration: underline; }
                        .sort-indicator { margin-left: 6px; font-size: 0.9em; color: #666; }
                        .active { font-weight: 600; }
                    `}</style>
                    <table border="1" cellPadding="5" cellSpacing="0">
                        <thead>
                            <tr>
                                <th
                                    onClick={() => handleSort("name")}
                                    className={`sortable ${sortKey === "name" ? "active" : ""}`}
                                    title="Click to sort"
                                    aria-sort={sortKey === "name" ? (sortOrder === "asc" ? "ascending" : "descending") : "none"}
                                >
                                    Name
                                    <span className="sort-indicator">{sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : "⇅"}</span>
                                </th>
                                <th
                                    onClick={() => handleSort("expiryDate")}
                                    className={`sortable ${sortKey === "expiryDate" ? "active" : ""}`}
                                    title="Click to sort by expiry date"
                                    aria-sort={sortKey === "expiryDate" ? (sortOrder === "asc" ? "ascending" : "descending") : "none"}
                                >
                                    Expiry (dd/mm/yyyy)
                                    <span className="sort-indicator">{sortKey === "expiryDate" ? (sortOrder === "asc" ? "▲" : "▼") : "⇅"}</span>
                                </th>
                                <th
                                    onClick={() => handleSort("quantity")}
                                    className={`sortable ${sortKey === "quantity" ? "active" : ""}`}
                                    title="Click to sort by quantity"
                                    aria-sort={sortKey === "quantity" ? (sortOrder === "asc" ? "ascending" : "descending") : "none"}
                                >
                                    Quantity
                                    <span className="sort-indicator">{sortKey === "quantity" ? (sortOrder === "asc" ? "▲" : "▼") : "⇅"}</span>
                                </th>
                                <th
                                    onClick={() => handleSort("price")}
                                    className={`sortable ${sortKey === "price" ? "active" : ""}`}
                                    title="Click to sort by price"
                                    aria-sort={sortKey === "price" ? (sortOrder === "asc" ? "ascending" : "descending") : "none"}
                                >
                                    Price(INR)
                                    <span className="sort-indicator">{sortKey === "price" ? (sortOrder === "asc" ? "▲" : "▼") : "⇅"}</span>
                                </th>
                                <th
                                    onClick={() => handleSort("brand")}
                                    className={`sortable ${sortKey === "brand" ? "active" : ""}`}
                                    title="Click to sort by brand"
                                    aria-sort={sortKey === "brand" ? (sortOrder === "asc" ? "ascending" : "descending") : "none"}
                                >
                                    Brand
                                    <span className="sort-indicator">{sortKey === "brand" ? (sortOrder === "asc" ? "▲" : "▼") : "⇅"}</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedFilteredMedicines.map(m => (
                                <tr key={m.id} style={getRowStyle(m)}>
                                    <td>{m.name}</td>
                                    <td>{formatDate(m.expiryDate)}</td>
                                    <td>{m.quantity}</td>
                                    <td>{(Number(m.price) || 0).toFixed(2)}</td>
                                    <td>{m.brand}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            }
            {filteredMedicines.length == 0 && <p>No medicines found with "{searchText}".</p>}
        </div>
    );
};
export default MedicineList;