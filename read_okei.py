import csv
import os
path = os.path.join('c:', os.sep, 'VSCode TORO', 'context', 'okei.csv')
f = open(path, encoding='cp1251')
r = csv.reader(f, delimiter=';')
rows = [row for row in r if len(row) >= 4 and row[2].strip().isdigit()]
print(f"Total units: {len(rows)}")
for row in rows[:60]:
    code = row[2].strip()
    name = row[3].strip()
    print(f"{code} - {name}")
