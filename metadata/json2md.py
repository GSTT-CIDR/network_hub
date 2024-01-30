#!/usr/bin/env python3

from argparse import ArgumentParser

parser = ArgumentParser()
parser.add_argument('json_filename', type=str)
parser.add_argument('-t', '--title', type=str)
parser.add_argument('-d', '--depth', type=int, default=1,
                    help="header depth of title (default=1)")
args = parser.parse_args()

import sys
import json

with open(args.json_filename, 'r') as f:
    j = json.load(f)

required = [
    ['Field name', 'Data type', 'Description'],
    ['-----']*3,
]
optional = [row[:] for row in required]  # deep copy

for k, v in j['data']['fields'].items():
    try:
        row = [f"`{k}`", f"`{v['type']}`", v['description']]

        if v['required']:
            required.append(row)
        else:
            optional.append(row)

    except:
        print("WARNING: could not create entry for key %s" % k, file=sys.stderr)

if args.title:
    print('#'*args.depth + ' ' + args.title)
    print()

print('#'*args.depth + '# Required\n')
print(''.join(['| ' + ' | '.join(row) + ' |\n' for row in required]))
print('#'*args.depth + '# Optional\n')
print(''.join(['| ' + ' | '.join(row) + ' |\n' for row in optional]))
