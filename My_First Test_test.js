Feature('My First Test');

Scenario('create user', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [1, 2], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWNW" });
  // usually we won't need direct access to response object for API testing 
  // but you can obtain it from request

  // check the last request was successful
  // this method introduced by JSONResponse helper
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    "patches": 1
  });
  I.seeResponseContainsJson({
    "coords":[2,3]
  });

})

Scenario('Run Into Wall Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [0, 0], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESEESWW" });
  // usually we won't need direct access to response object for API testing 
  // but you can obtain it from request

  // check the last request was successful
  // this method introduced by JSONResponse helper
  I.seeResponseCodeIsSuccessful();
  I.seeResponseContainsJson({
    "patches": 1
  });
  I.seeResponseContainsJson({
    "coords":[2,3]
  });

})

Scenario('Invalid Instruction Test', async ({ I }) => {
  const response = await I.sendPostRequest('/cleaning-sessions', { "roomSize" : [5, 5], "coords" : [0, 0], "patches" : [ [1, 0], [2, 2], [2, 3] ], "instructions" : "NNESABEESWNW" });
  // usually we won't need direct access to response object for API testing 
  // but you can obtain it from request

  // check the last request was successful
  // this method introduced by JSONResponse helper
  I.seeResponseCodeIsClientError();

})