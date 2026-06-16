import { memo, useMemo } from 'react';
import { List, useDynamicRowHeight, type RowComponentProps } from 'react-window';

import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

type RowData = {
  items: Country[];
  selectedYear: number;
  selectedColumns: string[];
};

const Row = ({ index, style, ...rowProps }: RowComponentProps<RowData>) => {
  const { items, selectedYear, selectedColumns } = rowProps;
  const country = items[index];

  if (!country) {
    return null;
  }

  return (
    <div style={style}>
      <CountryCard
        country={country}
        selectedYear={selectedYear}
        selectedColumns={selectedColumns}
      />
    </div>
  );
};

export const CountryList = memo(
  ({
    countries,
    searchQuery,
    selectedColumns,
    selectedRegion,
    selectedYear,
    sortField,
    sortOrder,
  }: CountryListProps) => {
    const countryPopulations = useMemo(() => {
      return countries.map((country) => ({
        id: country.id,
        population: getPopulationForYear(createYearDataMap(country.data), selectedYear) || 0,
      }));
    }, [countries, selectedYear]);

    const filteredCountries = useMemo(() => {
      const popMap: Record<string, number> = {};
      countryPopulations.forEach(({ id, population }) => {
        popMap[id] = population;
      });

      return countries
        .filter((c) => {
          const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
          return matchesSearch && matchesRegion;
        })
        .sort((a, b) => {
          if (sortField === 'name') {
            return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
          } else {
            const popA = popMap[a.id] || 0;
            const popB = popMap[b.id] || 0;
            return sortOrder === 'asc' ? popA - popB : popB - popA;
          }
        });
    }, [countries, searchQuery, selectedRegion, sortField, sortOrder, countryPopulations]);

    const rowProps = useMemo(
      () => ({
        items: filteredCountries,
        selectedYear,
        selectedColumns,
      }),
      [filteredCountries, selectedYear, selectedColumns]
    );

    const rowHeight = useDynamicRowHeight({ defaultRowHeight: 300 });

    if (filteredCountries.length === 0) {
      return <div className={styles.countryList}>No countries found</div>;
    }

    return (
      <div className={styles.countryList}>
        <List
          rowHeight={rowHeight}
          rowCount={filteredCountries.length}
          rowComponent={Row}
          rowProps={rowProps}
          style={{ height: '600px', width: '100%' }}
        />
      </div>
    );
  }
);
