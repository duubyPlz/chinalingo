#!/usr/bin/env python3

import sys
import json
import re

def parse_file(file_path):
    '''
    looks at the wanted file
    creates/returns a glob object for generate_json() to use
    '''
    MODULE_NUM = 2 # number of modules per line
    FAMILIAR_NUM = 2 # number of familiar sections per line
    MODULE_DELIMITER = ': '
    FAMILIAR_DELIMITER = '['
    WORD_DELIMITER = ' '

    vocab_file = open(file_path, 'r')

    # 1: 再見 (你 好)
    # 3: 叫 甚麽 李 (張 華)
    # 4: 高興 認識 (到 也 很)
    # 5: 麵 飯 茶 喝 吃 (魚 呢)
    # 6: 老師 醫生 (學生 開心)
    # 7: 電話 號碼 (多 少)
    # 8: 英 美 那 對 加拿大 都 (中國)
    # 9: 忙 早上 怎麽樣
    # 10: 北京 紐約 香港 (那)裏 (家)
    # 11: 謝 客氣 (對不)起 沒 關係
    # 12: 誰 (爸 媽 愛 個)

    glob = []

    '''
    glob [
        { lesson: 1, entries: [
            { module: 1, content: 再見, isFamiliar: false },
            { module: 1, content: 你, isFamiliar: true },
            ...
        ]},
        ...,
        { lesson: 11, entries: [
            ...
            { module: 11, content: 客氣, isFamiliar: false },
            { module: 11, content: 起, isFamiliar: false },
            { module: 11, content: 對不起, isFamiliar: true },
            ...
        ]},
        ...
    ]
    '''

    for line in vocab_file:
        # Lesson and Content split
        lesson_and_content = line.split(MODULE_DELIMITER)

        if len(lesson_and_content) != MODULE_NUM:
            # syntax error: ': '
            print("Line does not have a valid module, skipping line...: {}".format(line), file=sys.stderr)
            continue

        lessonNum = lesson_and_content[0]
        content = lesson_and_content[1]

        currentLesson = dict(lesson=lessonNum,
                             entries=[])

        # For each content entry, populate lesson.entries
        unfam_and_fam = content.split(FAMILIAR_DELIMITER)

        unfamiliar = []
        familiar = []
        if (len(unfam_and_fam) < FAMILIAR_NUM - 1 or
            len(unfam_and_fam) > FAMILIAR_NUM):
           # syntax error: '['
           print("Line does not have a valid familiar separation (with [), skipping line...: {}".format(line), file=sys.stderr)
           continue
        elif len(unfam_and_fam) < FAMILIAR_NUM:
            unfamString = unfam_and_fam[0]

            unfamiliar = unfamString.split(WORD_DELIMITER)
        else:
            # len should thus be 2
            unfamString = unfam_and_fam[0]
            famString = unfam_and_fam[1]

            unfamiliar = unfamString.split(WORD_DELIMITER)
            familiar = famString.split(WORD_DELIMITER)

        # Now, lesson.entries should be [...unfamiliar_entries, ...familiar_entries]
        unfamiliar_entries = create_entries(lessonNum, unfamiliar, False)
        familiar_entries = create_entries(lessonNum, familiar, True)

        for entry in unfamiliar_entries:
            currentLesson['entries'].append(entry)

        for entry in familiar_entries:
            currentLesson['entries'].append(entry)

        glob.append(currentLesson)
    
    # print("GLOB: {}".format(glob))

    vocab_file.close()

    return glob

def create_entries(lessonNum, contentList, isFamiliar):
    entries = []
    for content in contentList:
        word = content.strip()

        if not word:
            continue

        currentEntry = dict(module=lessonNum,
                        content=word,
                        isFamiliar=False)
        print("{}".format(currentEntry))
        entries.append(currentEntry)
    
    return entries

def get_json(glob):
    '''
    python object to json
    '''
    return json.dumps(glob, indent=2)

def create_new_file(json, new_file_name):
    '''
    creates a json file in the same directory,
    with the specified name and specified json contents
    '''
    new_file = open(new_file_name, 'w')
    new_file.write(json)
    new_file.close()

def run(file_path, new_file_name):
    print("== Output file: {} ==".format(new_file_name))
    print(" > parsing...")
    glob = parse_file(file_path)
    print("\n> converting to json...")
    jsonText = get_json(glob)
    print("== Generated the following json content: ==\n{}".format(jsonText))

    create_new_file(jsonText, new_file_name)

if __name__ == "__main__":
    vocab_file_path = "./vocab.txt"
    new_file_name = "vocab.json"
    run(vocab_file_path, new_file_name)

