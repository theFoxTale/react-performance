# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: 4 s
- **Render duration**: 96 ms
- **Screenshot**: ![screenshot](./docs/screenshots/baseline/Sort%20countries.png)

### Interaction B: Search countries

- **Commit duration**: 3.8 s
- **Render duration**: 13 ms
- **Screenshot**: ![screenshot](./docs/screenshots/baseline/Search%20countries.png)

### Interaction C: Change year

- **Commit duration**: 2.3 s
- **Render duration**: 98 ms
- **Screenshot**: ![screenshot](./docs/screenshots/baseline/Change%20Year.png)

### Interaction D: Toggle column

- **Commit duration**: 2,5 s
- **Render duration**: 102 ms
- **Screenshot**: ![screenshot](./docs/screenshots/baseline/Toggle%20Columns.png)

## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: 2,6 s
- **Render duration**: 5 ms
- **Screenshot**: ![screenshot](./docs/screenshots/optimized/Sort%20countries.png)

### Interaction B: Search countries

- **Commit duration**: 2,6 s
- **Render duration**: 0.1 ms
- **Screenshot**: ![screenshot](./docs/screenshots/optimized/Search%20countries.png)

### Interaction C: Change year

- **Commit duration**: 2,3 s
- **Render duration**: 37 ms
- **Screenshot**: ![screenshot](./docs/screenshots/optimized/Change%20Year.png)

### Interaction D: Toggle column

- **Commit duration**: 1,2 s
- **Render duration**: 3 ms
- **Screenshot**: ![screenshot](./docs/screenshots/optimized/Toggle%20Columns.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 96            | 5              | 94,79%      |
| Search countries | 13            | 0,1            | 99,23%      |
| Change year      | 98            | 37             | 62,24%      |
| Toggle column    | 102           | 3              | 97,06%      |
| **Average**      | **77,25**     | **11,28**      | **88,33%**  |
