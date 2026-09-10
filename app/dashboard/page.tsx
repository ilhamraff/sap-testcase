"use client";

import { SalesItem } from "@/types";
import { useMemo, useState } from "react";
import salesRawData from "@/data/sales.json";
import SalesChart from "@/components/SalesChart";
import SummaryCards from "@/components/SummaryCard";
import SearchFilter from "@/components/SearchFilter";
import SalesTable from "@/components/SalesTable";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");

  const allSales: SalesItem[] = salesRawData;

  const areaList = useMemo(() => {
    return Array.from(new Set(allSales.map((item) => item.area)));
  }, [allSales]);

  const filteredSales = useMemo(() => {
    return allSales.filter((item) => {
      const matchName = item.nama_sales
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
      const matchArea = selectedArea === "" || item.area === selectedArea;

      return matchName && matchArea;
    });
  }, [allSales, searchQuery, selectedArea]);

  const handleResetFilter = () => {
    setSearchQuery("");
    setSelectedArea("");
  };

  return (
    <>
      {/* Header Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-platinum-900 tracking-tight">
            Analisa Performa Salesman
          </h1>
          <p className="text-xs sm:text-sm text-platinum-500 mt-1">
            Monitoring efektivitas kunjungan lapangan, total pencapaian order,
            dan risiko out-of-stock (OOS).
          </p>
        </div>
        <div className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 bg-white border border-platinum-200 rounded-lg shadow-2xs text-xs text-platinum-600">
          <span className="w-2 h-2 rounded-full bg-jade-500 animate-pulse" />
          <span>Region Jawa Barat &bull; 5 Territory</span>
        </div>
      </div>

      {/* Summary Cards */}
      <section aria-label="Ringkasan Performa">
        <SummaryCards data={filteredSales} />
      </section>

      {/* Filter Data Sales */}
      <section aria-label="Filter Data Sales">
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedArea={selectedArea}
          onAreaChange={setSelectedArea}
          areaList={areaList}
          onReset={handleResetFilter}
        />
      </section>

      {/* Sales Chart */}
      <section aria-label="Grafik Efektivitas Sales">
        <SalesChart data={filteredSales} />
      </section>

      {/* Sales Table */}
      <section aria-label="Tabel Data Sales">
        <SalesTable data={filteredSales} />
      </section>
    </>
  );
}

