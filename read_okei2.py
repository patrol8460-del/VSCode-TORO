import csv, os
base = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(base, 'context', 'okei.csv')
f = open(path, encoding='cp1251')
r = csv.reader(f, delimiter=';')
rows = [row for row in r if len(row) >= 4 and row[2].strip().isdigit()]
print("Total units: %d" % len(rows))
for row in rows[:80]:
    code = row[2].strip()
    name = row[3].strip()
    print("%s - %s" % (code, name))
