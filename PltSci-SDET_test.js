Feature('PltSci SDET Assignment');

/**
 * Performs initial test example as seen in assignment's instructions
 * 
 */
Scenario('Initial test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // check the last request was successful
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    "patches": 1
  });
  I.seeResponseContainsJson({
    "coords":[1,3]
  });

})

/**
 * Performs initial test example as seen in assignment's instructions
 * 
 */
 Scenario('Consistency Check Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // check the last request was successful
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    "patches": 1
  });
  I.seeResponseContainsJson({
    "coords":[1,3]
  });

})

Scenario('Patch On Starting Point Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1,2] ], "instructions" : "N" });

  // check the last request was successful
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    "patches": 1
  });
  I.seeResponseContainsJson({
    "coords":[1,3]
  });

})

/**
 * Checks scenario based on having no input for 'roomSize'
 * 
 */
Scenario('No Input For roomSize Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [ ], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // check the last request provides a server error (500)
  I.seeResponseCodeIsServerError();

})

/**
 * Checks scenario based on dimensions for 'roomSize'
 */
//This is a failed scenario (should not be able to accept 3 dimensions for 'roomSize')
Scenario('Invalid roomSize Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5, 4], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if a character is valid for 'roomSize'
 */
Scenario('Character In roomSize Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : ["A", 5], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if a negative value is valid for 'roomSize'
 */
Scenario('Negative roomSize Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, -5 ], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if you can enter just 1 value for 'roomSize'
 */
Scenario('One Value For Room Size Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [ 5 ], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // check the last request provides a server error (500)
  I.seeResponseCodeIsServerError();

})

/**
 * Checks to see if no input is valid for 'coords'
 */
Scenario('No Input For Coords Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [ ], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if you can enter 1 value for 'coords'
 */
Scenario('One Value For Coords Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [ 2 ], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if you are able to enter multiple dimensions (more than 2) for 'coords'
 */
//This is a failed scenario (should not be able to accept 3 dimensions for 'coords')
Scenario('Invalid Dimensions for coords Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2, 4], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if negative x values are valid for 'coords'
 */
Scenario('Negative x Value For coords Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [-1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if negative y values are valid for 'coords'
 */
//This is a failed scenario (should not be able to accept negative values for coords)
Scenario('Negative y Value For coords Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, -2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if hoover can start outside of the boundaries (5,5)
 */
Scenario('Out Of Bounds coords Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [10, 10], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if having no input is valid for 'patches'
 */
Scenario('No Patches Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [ ] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if you are able to enter multiple dimensions (more than 2) for 'patches' 
 */
//This is a failed scenario (should not be able to accept 3 dimensions for 'patches')
Scenario('Invalid Dimensions For Patches Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1,2,4] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if you can enter just 1 value for 'patches'
 */
Scenario('One Value For Patch Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [ 2 ] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * This scenario tests to see if a patch can be past the boundary for the y-axis wall (i, 5)
 */
Scenario('Patch on Y Axis Out Of Boundary Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1,5] ], "instructions" : "N" });

  // check the last request was successful
  I.seeResponseCodeIsClientError();

})

/**
 * This scenario tests to see if a patch can be past the boundary for the x-axis wall (5, i)
 */
Scenario('Patch on X Axis Out Of Boundary Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [5,1] ], "instructions" : "N" });

  // check the last request was successful
  I.seeResponseCodeIsClientError();

})

/**
 * This scenario tests to see if a patch can be on the boundary for the y-axis wall (4, i)
 */
Scenario('Patch on Y Axis Wall Boundary Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [4,1] ], "instructions" : "N" });

  // check the last request was successful
  I.seeResponseCodeIsSuccessful();

})

/**
 * This scenario tests to see if a patch can be on the boundary for the y-axis wall (i, 4)
 */
Scenario('Patch on X Axis Wall Boundary Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1,4] ], "instructions" : "N" });

  // check the last request was successful
  I.seeResponseCodeIsSuccessful();

})

/**
 * Checks to see if negative values can be used for 'patches'
 */
Scenario('Negative Values In patches Test,', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [-1,4] ], "instructions" : "NNESEESWNWW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

Scenario('Duplicate Patches Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1, 2], [1, 2] ], "instructions" : "NS" });

  // check the last request was successful
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    "patches": 1
  });
  I.seeResponseContainsJson({
    "coords":[1,2]
  });

})

/**
 * Checks to see if other characters (other than N,S,E,W) are valid for 'instructions'
 */
Scenario('Invalid Characters In Instruction Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [0, 0], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESABEESWNW" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if no input is valid for 'instructions'
 */
Scenario('No Instruction Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "" });

  // check the last request was successful
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    "patches": 0
  });
  I.seeResponseContainsJson({
    "coords":[1,2]
  });

})

/**
 * Checks to see if lower-case letters are valid for 'instructions'
 */
//This is a failed scenario (input should allow lower-case letters unless otherwise specified)
Scenario('Lower-case Instructions Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "nneseeswnww" });

  // check the last request was successful
  I.seeResponseCodeIsSuccessful();

})

/**
 * Checks to see if 'instructions' can have a combination of letters and numbers
 */
Scenario('Instructions With Numbers Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNES123" });

  // Should produce client error (400) 
  I.seeResponseCodeIsClientError();

})

/**
 * Checks to see if hoover will 'hover' in place when running into walls
 */
Scenario('Run Into Wall Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNN" });
  // check the last request was successful
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    "coords":[1,4]
  });

})

/**
 * Checks to see if only one value is valid for 'instructions'
 */
Scenario('One Instruction Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1, 3] ], "instructions" : "N" });

  // check the last request was successful
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    "patches": 1
  });
  I.seeResponseContainsJson({
    "coords":[1,3]
  });


})

/**
 * Performs initial test example as seen in assignment's instructions
 * 
 */
 Scenario('Consistency Check For Initial Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNWW" });

  // check the last request was successful
  I.seeResponseCodeIsSuccessful();
  // Should return 1 patch but returns 5
  I.seeResponseContainsJson({
    "patches": 1
  });
  I.seeResponseContainsJson({
    "coords":[1,3]
  });

})

