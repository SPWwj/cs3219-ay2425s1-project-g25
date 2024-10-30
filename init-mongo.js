const resetAllDatabases = true;

const MONGO_INITDB_ROOT_USERNAME = "admin";
const MONGO_INITDB_ROOT_PASSWORD = "password";
const PEERPREP_QUESTION_INITDB_NAME = "peerprepQuestionServiceDB";
// const PEERPREP_USER_INITDB_NAME = "peerprepUserServiceDB";
// const PEERPREP_COLLAB_INITDB_NAME = "peerprepCollabServiceDB";

db.getSiblingDB("admin").auth(MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD);

/*-----------------------------QUESTION-SERVICE-DB-------------------------------------*/
const db1 = db.getSiblingDB(PEERPREP_QUESTION_INITDB_NAME);

const isQuestionDatabaseResetDesired = false || resetAllDatabases;
if (isQuestionDatabaseResetDesired) {
    db1.Categories.drop();
    db1.Questions.drop();
}

/*---------------QUESTION-SERVICE-DB-INIT----------------*/
const categories = [
    "Strings",
    "Algorithms",
    "Data Structures",
    "Bit Manipulation",
    "Recursion",
    "Databases",
    "Arrays",
    "Brainteaser"
];

const categoryIds = {};

categories.forEach(category => {
    const existingCategory = db1.categories.findOne({ name: category });
    if (existingCategory) {
        categoryIds[category] = existingCategory._id;
    } else {
        const result = db1.categories.insertOne({ name: category });
        categoryIds[category] = result.insertedId;
    }
});

const questions = 
[
    {
        "title": "Reverse a String",
        "description": "Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array **in-place** with O(1) extra memory.\n\n**Example 1:**\n\nInput: `s = [\"h\",\"e\",\"l\",\"l\",\"o\"]`\n\nOutput: `[\"o\",\"l\",\"l\", \"e\",\"h\"]`\n\n**Example 2:**\n\nInput: `s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]`\n\nOutput: `[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]`\n\n**Constraints:**\n\n- `1 <= s.length <= 105`\n- `s[i]` is a printable ASCII character.",
        "difficulty": "Easy",
        "categories": ["Strings", "Algorithms"],
        "url": "https://leetcode.com/problems/reverse-string/"
    },
    {
        "title": "Linked List Cycle Detection",
        "description": "### Problem\n\nImplement a function to detect if a linked list contains a cycle.\n\n![Linked List Cycle](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)\n\n### Instructions\n\n- Given a linked list, determine if it has a cycle in it.\n- Can you solve it using O(1) memory?\n\n### Example\n\n**Input:**\n```\nhead = [3, 2, 0, -4], pos = 1 (indicating tail connects to node index 1)\n```\n\n**Output:**\n```\ntrue\n```\n\n### Constraints\n\n- The number of nodes in the list is in the range [0, 10^4].\n- `-10^5 <= Node.val <= 10^5`.",
        "difficulty": "Easy",
        "categories": ["Data Structures", "Algorithms"],
        "url": "https://leetcode.com/problems/linked-list-cycle/"
    },
    {
        "title": "Roman to Integer",
        "description": "Given a roman numeral, convert it to an integer.",
        "difficulty": "Easy",
        "categories": ["Algorithms"],
        "url": "https://leetcode.com/problems/roman-to-integer/"
    },
    {
        "title": "Add Binary",
        "description": "Given two binary strings a and b, return their sum as a binary string.",
        "difficulty": "Easy",
        "categories": ["Bit Manipulation", "Algorithms"],
        "url": "https://leetcode.com/problems/add-binary/"
    },
    {
        "title": "Fibonacci Number",
        "description": "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,\nF(0) = 0, F(1) = 1\nF(n) = F(n - 1) + F(n - 2), for n > 1.\nGiven n, calculate F(n).",
        "difficulty": "Easy",
        "categories": ["Recursion", "Algorithms"],
        "url": "https://leetcode.com/problems/fibonacci-number/"
    },
    {
        "title": "Implement Stack using Queues",
        "description": "Implement a last-in- first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).",
        "difficulty": "Easy",
        "categories": ["Data Structures"],
        "url": "https://leetcode.com/problems/implement-stack-using-queues/"
    },
    {
        "title": "Combine Two Tables",
        "description": "Given table Person with the following columns:\n1. personId (int)\n2. lastName (varchar)\n3. firstName (varchar)\npersonId is the primary key.\nAnd table Address with the following columns:\n1. addressId (int)\n2. personId (int)\n3. city (varchar)\n4. state (varchar)\naddressId is the primary key.\nWrite a solution to report the first name, last name, city, and state of each person in the Person table. If the address of a personId is not present in the Address table, report null instead. Return the result table in any order.",
        "difficulty": "Easy",
        "categories": ["Databases"],
        "url": "https://leetcode.com/problems/combine-two-tables/"
    },
    {
        "title": "Repeated DNA Sequences",
        "description": "The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.\nFor example, \"ACGAATTCCG\" is a DNA sequence. When studying DNA, it is useful to identify repeated sequences within the DNA.\nGiven a string s that represents a DNA sequence, return all the 10-letter-long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.",
        "difficulty": "Medium",
        "categories": ["Algorithms", "Bit Manipulation"],
        "url": "https://leetcode.com/problems/repeated-dna-sequences/"
    },
    {
        "title": "Course Schedule",
        "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\nFor example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.\nReturn true if you can finish all courses. Otherwise, return false.",
        "difficulty": "Medium",
        "categories": ["Data Structures", "Algorithms"],
        "url": "https://leetcode.com/problems/course-schedule/"
    },
    {
        "title": "LRU Cache Design",
        "description": "Design and implement an LRU (Least Recently Used) cache.",
        "difficulty": "Medium",
        "categories": ["Data Structures"],
        "url": "https://leetcode.com/problems/lru-cache/"
    },
    {
        "title": "Longest Common Subsequence",
        "description": "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.\nFor example, \"ace\" is a subsequence of \"abcde\". A common subsequence of two strings is a subsequence that is common to both strings.",
        "difficulty": "Medium",
        "categories": ["Strings", "Algorithms"],
        "url": "https://leetcode.com/problems/longest-common-subsequence/"
    },
    {
        "title": "Rotate Image",
        "description": "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).",
        "difficulty": "Medium",
        "categories": ["Arrays", "Algorithms"],
        "url": "https://leetcode.com/problems/rotate-image/"
    },
    {
        "title": "Airplane Seat Assignment Probability",
        "description": "n passengers board an airplane with exactly n seats. The first passenger has lost the ticket and picks a seat randomly. But after that, the rest of the passengers will:\nTake their own seat if it is still available, and Pick other seats randomly when they find their seat occupied\nReturn the probability that the nth person gets his own seat.",
        "difficulty": "Medium",
        "categories": ["Brainteaser"],
        "url": "https://leetcode.com/problems/airplane-seat-assignment-probability/"
    },
    {
        "title": "Validate Binary Search Tree",
        "description": "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
        "difficulty": "Medium",
        "categories": ["Data Structures", "Algorithms"],
        "url": "https://leetcode.com/problems/validate-binary-search-tree/"
    },
    {
        "title": "Sliding Window Maximum",
        "description": "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\nReturn the max sliding window.",
        "difficulty": "Hard",
        "categories": ["Arrays", "Algorithms"],
        "url": "https://leetcode.com/problems/sliding-window-maximum/"
    },
    {
        "title": "N-Queen Problem",
        "description": "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\nGiven an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\nEach solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.",
        "difficulty": "Hard",
        "categories": ["Algorithms"],
        "url": "https://leetcode.com/problems/n-queens/"
    },
    {
        "title": "Serialize and Deserialize a Binary Tree",
        "description": "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
        "difficulty": "Hard",
        "categories": ["Data Structures", "Algorithms"],
        "url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/"
    },
    {
        "title": "Wildcard Matching",
        "description": "Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:\n'?' Matches any single character. '*' Matches any sequence of characters (including the empty sequence). The matching should cover the entire input string (not partial).",
        "difficulty": "Hard",
        "categories": ["Strings", "Algorithms"],
        "url": "https://leetcode.com/problems/wildcard-matching/"
    },
    {
        "title": "Chalkboard XOR Game",
        "description": "You are given an array of integers nums represents the numbers written on a chalkboard.\nAlice and Bob take turns erasing exactly one number from the chalkboard, with Alice starting first. If erasing a number causes the bitwise XOR of all the elements of the chalkboard to become 0, then that player loses. The bitwise XOR of one element is that element itself, and the bitwise XOR of no elements is 0.\nAlso, if any player starts their turn with the bitwise XOR of all the elements of the chalkboard equal to 0, then that player wins.\nReturn true if and only if Alice wins the game, assuming both players play optimally.",
        "difficulty": "Hard",
        "categories": ["Brainteaser"],
        "url": "https://leetcode.com/problems/chalkboard-xor-game/"
    },
    {
        "title": "Trips and Users",
        "description": "Given table Trips:\n1. id (int)\n2. client_id (int)\n3. driver_id (int)\n4. city_id (int)\n5. status (enum)\n6. request_at(date)\nid is the primary key. The table holds all taxi trips. Each trip has a unique id, while client_id and driver_id are foreign keys to the users_id at the Users table. Status is an ENUM (category) type of ('completed', 'cancelled_by_driver', 'cancelled_by_client').\nAnd table Users:\n1. users_id (int)\n2. banned (enum)\n3. role (enum)\nusers_id is the primary key (column with unique values) for this table. The table holds all users. Each user has a unique users_id, and role is an ENUM type of ('client', 'driver', 'partner'). banned is an ENUM (category) type of ('Yes', 'No'). The cancellation rate is computed by dividing the number of canceled (by client or driver) requests with unbanned users by the total number of requests with unbanned users on that day.\nWrite a solution to find the cancellation rate of requests with unbanned users (both client and driver must not be banned) each day between \"2013-10-01\" and \"2013-10-03\". Round Cancellation Rate to two decimal points.\nReturn the result table in any order.",
        "difficulty": "Hard",
        "categories": ["Databases"],
        "url": "https://leetcode.com/problems/trips-and-users/"
    }
]

const existingCodes = db1.questions.distinct("code");
let currentCode = 1;

function getNextAvailableCode() {
    while (existingCodes.includes(currentCode)) {
        currentCode++;
    }
    return currentCode;
}

questions.forEach((question, index) => {
    const categoryIdsForQuestion = question.categories.map(cat => categoryIds[cat]);

    const existingQuestion = db1.questions.findOne({ title: question.title });
    if (!existingQuestion) {
        const code = currentCode++;
        db1.questions.insertOne({
            code: code,
            title: question.title,
            description: question.description,
            difficulty: question.difficulty,
            categories: categoryIdsForQuestion,
            url: question.url
        });
    }
});

/*-----------------------------USER-SERVICE-DB-------------------------------------*/
const db2 = db.getSiblingDB(PEERPREP_USER_INITDB_NAME);

const isUserDatabaseResetDesired = false || resetAllDatabases;
if (isUserDatabaseResetDesired) {
    db2.Users.drop();
}

/*---------------USER-SERVICE-DB-INIT----------------*/
/*const users = [
    {
        "username": "admin",
        "email": "admin@example.com",
        "password": "$2b$10$e0NRG4V8f8P6uT4QkMnX9e.KYyrLf3XRL.zV9uD1UYkQb8Ug2BxZe", // Hashed 'adminpassword' (DO NOT DELETE COMMENT)
        "isAdmin": true
    },
    {
        "username": "user",
        "email": "user@example.com",
        "password": "$2b$10$zQnH5eVZ4u6/eHLeP5/djOOGW.zYxEhAq1lZL7sVuo9J9mBNf7Yaa", // Hashed 'userpassword' (DO NOT DELETE COMMENT)
        "isAdmin": false
    }
];


users.forEach(user => {
    const existingUser = db2.users.findOne({ email: user.email });
    if (!existingUser) {
        db2.users.insertOne({
            username: user.username,
            email: user.email,
            password: user.password,
            createdAt: new Date(),
            isAdmin: user.isAdmin
        });
    }
});*/

/*-----------------------------INDEXING-(OPTIONAL)---------------------------------*/

db1.categories.createIndex({ name: 1 }, { unique: true });
db1.questions.createIndex({ title: 1 }, { unique: true });
