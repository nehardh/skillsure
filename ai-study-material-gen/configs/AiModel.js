const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const fs = require("node:fs");
  const mime = require("mime-types");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "text/plain",
  };
  
    export const courseOutlineAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a study material for Python for Exam and level of difficulty will be EASY with summery of course, List of Chapters along with summery for each chapter, Topic list in each chapter, All result in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course_title\": \"Python for Beginners (Exam Preparation - Easy)\",\n  \"course_summary\": \"This course provides a foundational understanding of Python programming, focusing on core concepts essential for the exam. It covers basic syntax, data types, control flow, and working with functions. The course emphasizes practical application through simple examples and exercises, making it easy for beginners to grasp the fundamentals and prepare for a basic Python exam.\",\n  \"level_of_difficulty\": \"Easy\",\n  \"chapters\": [\n    {\n      \"chapter_number\": 1,\n      \"chapter_title\": \"Introduction to Python\",\n      \"chapter_summary\": \"This chapter introduces Python's history, its advantages, and how to set up the development environment. It also covers the basic syntax rules and how to write a simple \\\"Hello, World!\\\" program.\",\n      \"topics\": [\n        \"What is Python?\",\n        \"Why learn Python?\",\n        \"Python's advantages and disadvantages\",\n        \"Installing Python (Anaconda/Miniconda recommended)\",\n        \"Setting up a code editor (VS Code, Thonny)\",\n        \"Writing your first Python program (Hello, World!)\",\n        \"Basic syntax rules (indentation, comments)\"\n      ]\n    },\n    {\n      \"chapter_number\": 2,\n      \"chapter_title\": \"Data Types and Variables\",\n      \"chapter_summary\": \"This chapter covers fundamental data types in Python, such as integers, floats, strings, and booleans. It explains how to declare variables and assign values to them.\",\n      \"topics\": [\n        \"Data types: Integers (int), Floating-point numbers (float), Strings (str), Booleans (bool)\",\n        \"Variables: Naming conventions, assigning values\",\n        \"Type conversion (casting): int(), float(), str(), bool()\",\n        \"Basic arithmetic operators: +, -, *, /, //, %, **\",\n        \"String manipulation: Concatenation, slicing\"\n      ]\n    },\n    {\n      \"chapter_number\": 3,\n      \"chapter_title\": \"Control Flow: Conditional Statements\",\n      \"chapter_summary\": \"This chapter explains how to use conditional statements (if, elif, else) to control the flow of execution based on different conditions.\",\n      \"topics\": [\n        \"Conditional statements: if, elif, else\",\n        \"Comparison operators: ==, !=, >, <, >=, <=\",\n        \"Logical operators: and, or, not\",\n        \"Nested if statements\"\n      ]\n    },\n    {\n      \"chapter_number\": 4,\n      \"chapter_title\": \"Control Flow: Loops\",\n      \"chapter_summary\": \"This chapter introduces two types of loops in Python: for loops and while loops. It explains how to iterate over sequences and repeat code blocks based on conditions.\",\n      \"topics\": [\n        \"For loops: Iterating over sequences (lists, strings, ranges)\",\n        \"While loops: Repeating code blocks based on a condition\",\n        \"Break statement: Exiting a loop prematurely\",\n        \"Continue statement: Skipping to the next iteration\",\n        \"Looping through strings\"\n      ]\n    },\n    {\n      \"chapter_number\": 5,\n      \"chapter_title\": \"Functions\",\n      \"chapter_summary\": \"This chapter covers the concept of functions, including how to define functions, pass arguments, and return values.\",\n      \"topics\": [\n        \"Defining functions: def keyword\",\n        \"Function arguments: Positional arguments, keyword arguments\",\n        \"Return values: return keyword\",\n        \"Scope of variables: Local vs. global variables\",\n        \"Calling functions\"\n      ]\n    },\n    {\n      \"chapter_number\": 6,\n      \"chapter_title\": \"Lists\",\n      \"chapter_summary\": \"This chapter introduces Lists, one of the most versatile data structures in python. It covers how to create and manipulate Lists, how to access elements and modify them.\",\n      \"topics\": [\n        \"Creating Lists: []\",\n        \"Accessing List elements: index\",\n        \"List slicing\",\n        \"List methods: append, insert, remove, pop, len, sort, reverse\",\n        \"Looping through Lists\"\n      ]\n    }\n\n  ],\n  \"exam_tips\": [\n    \"Focus on understanding the core concepts rather than memorizing specific code snippets.\",\n    \"Practice writing small programs to solidify your understanding.\",\n    \"Pay attention to indentation, as it is crucial in Python.\",\n    \"Read the exam questions carefully and understand what they are asking.\",\n    \"Review past exam papers if available.\",\n    \"Manage your time effectively during the exam.\"\n  ]\n}\n```"},
          ],
        },
      ],
    });

    export const generateNotesAiModel = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate exam material detail content for each chapter, Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTMLK, Head, Body, title tag), The chapters:\n    {\n      \"chapter_number\": 1,\n      \"chapter_title\": \"Introduction to Java\",\n      \"chapter_summary\": \"This chapter introduces the Java programming language, its history, features, and the Java Virtual Machine (JVM). It also covers setting up the Java development environment and writing your first Java program.\",\n      \"topics\": [\n        \"What is Java?\",\n        \"History and features of Java\",\n        \"Java Virtual Machine (JVM)\",\n        \"Setting up the Java Development Kit (JDK)\",\n        \"Writing a simple Java program (Hello, World!)\",\n        \"Compiling and running Java code\",\n        \"Basic Java syntax\"\n      ]\n    },"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```html\n<h2>Chapter 1: Introduction to Java</h2>\n\n<h3>What is Java?</h3>\n<ul>\n    <li>Define Java as a high-level, object-oriented, platform-independent programming language.</li>\n    <li>Explain the key characteristics of Java: Write Once, Run Anywhere (WORA).</li>\n    <li>Discuss the different editions of Java: Java Standard Edition (SE), Java Enterprise Edition (EE), Java Micro Edition (ME).</li>\n    <li>Explain common use cases of Java, such as web applications, mobile applications, and enterprise systems.</li>\n</ul>\n\n<h3>History and Features of Java</h3>\n<ul>\n    <li>Trace the history of Java, starting with its origins at Sun Microsystems (now Oracle).</li>\n    <li>Explain the key milestones in Java's evolution (e.g., Java 1.0, Java 5, Java 8, Java 11).</li>\n    <li>Describe the core features of Java:\n        <ul>\n            <li>Object-Oriented Programming (OOP): Encapsulation, Inheritance, Polymorphism.</li>\n            <li>Platform Independence: Achieved through the JVM.</li>\n            <li>Robustness: Strong type checking, exception handling, garbage collection.</li>\n            <li>Security: Built-in security features to prevent malicious code.</li>\n            <li>Multi-threading: Support for concurrent programming.</li>\n            <li>Automatic Memory Management: Garbage collection.</li>\n        </ul>\n    </li>\n</ul>\n\n<h3>Java Virtual Machine (JVM)</h3>\n<ul>\n    <li>Explain the role of the JVM as an abstract computing machine that executes Java bytecode.</li>\n    <li>Describe the JVM architecture, including:\n        <ul>\n            <li>Class Loader: Loads class files into memory.</li>\n            <li>Bytecode Verifier: Ensures the bytecode is valid and secure.</li>\n            <li>Runtime Data Areas: Heap, Stack, Method Area, PC Registers.</li>\n            <li>Execution Engine: Executes the bytecode, using either an interpreter or a Just-In-Time (JIT) compiler.</li>\n        </ul>\n    </li>\n    <li>Differentiate between the Java Runtime Environment (JRE) and the Java Development Kit (JDK).</li>\n</ul>\n\n<h3>Setting up the Java Development Kit (JDK)</h3>\n<ul>\n    <li>Provide step-by-step instructions on how to download and install the JDK from the Oracle website (or other distributions like OpenJDK).</li>\n    <li>Explain how to set the JAVA_HOME environment variable.</li>\n    <li>Explain how to add the JDK's bin directory to the system's PATH environment variable.</li>\n    <li>Demonstrate how to verify the JDK installation using the `java -version` command.</li>\n</ul>\n\n<h3>Writing a Simple Java Program (Hello, World!)</h3>\n<ul>\n    <li>Provide a basic \"Hello, World!\" Java program example.</li>\n    <li>Explain the structure of a Java program:\n        <ul>\n            <li>Class declaration.</li>\n            <li>`main` method (public static void main(String[] args)).</li>\n            <li>`System.out.println()` statement.</li>\n        </ul>\n    </li>\n</ul>\n\n<h3>Compiling and Running Java Code</h3>\n<ul>\n    <li>Explain the compilation process using the `javac` command.</li>\n    <li>Explain the execution process using the `java` command.</li>\n    <li>Demonstrate how to compile and run the \"Hello, World!\" program from the command line.</li>\n    <li>Discuss the role of the Java compiler and the Java interpreter.</li>\n</ul>\n\n<h3>Basic Java Syntax</h3>\n<ul>\n    <li>Introduce basic Java syntax elements:\n        <ul>\n            <li>Keywords: `class`, `public`, `static`, `void`, `main`, `new`, etc.</li>\n            <li>Identifiers: Naming conventions for variables, methods, and classes.</li>\n            <li>Data Types: `int`, `double`, `boolean`, `String`, etc. (briefly introduce, more detail in later chapters).</li>\n            <li>Variables: Declaration, initialization, and assignment.</li>\n            <li>Operators: Arithmetic, relational, logical. (briefly introduce, more detail in later chapters).</li>\n            <li>Comments: Single-line (`//`) and multi-line (`/* ... */`).</li>\n            <li>Semicolons: Statement terminators.</li>\n        </ul>\n    </li>\n</ul>\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // // TODO: Following code needs to be updated for client-side apps.
    // const candidates = result.response.candidates;
    // for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
    //   for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
    //     const part = candidates[candidate_index].content.parts[part_index];
    //     if(part.inlineData) {
    //       try {
    //         const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
    //         fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
    //         console.log(`Output written to: ${filename}`);
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     }
    //   }
    // }
    // console.log(result.response.text());
 