App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted1: false,
  hasVoted2: false,
  hasVoted3: false,
  hasVoted4: false,
  hasVoted5: false,
  hasVoted6: false,
  checker: false,
  electiontag: 0,
  eleccount: 0,
  facename: "dd",
  electionInstance: " ",
  facecheck: true,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    
  },


  render: function() {
    
    var totalcandidate;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
        console.log(account);
      }
    });

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.ElectionCount();
    }).then(function(electionsCount) 

    {
      var elecname;
      var candidatesResults1 = $("#1");
      candidatesResults1.empty();

      var candidatesResults2 = $("#2");
      candidatesResults2.empty();

      var candidatesResults3 = $("#3");
      candidatesResults3.empty();

      var candidatesResults4 = $("#4");
      candidatesResults4.empty();

       var candidatesResults5 = $("#5");
      candidatesResults5.empty();

      var candidatesResults6 = $("#6");
      candidatesResults6.empty();


      var candidatesSelect1 = $('#candidatesSelect1');
      candidatesSelect1.empty();

      var candidatesSelect2 = $('#candidatesSelect2');
      candidatesSelect2.empty();

       var candidatesSelect3 = $('#candidatesSelect3');
      candidatesSelect3.empty();

      var candidatesSelect4 = $('#candidatesSelect4');
      candidatesSelect4.empty();

       var candidatesSelect5 = $('#candidatesSelect5');
      candidatesSelect5.empty();

      var candidatesSelect6 = $('#candidatesSelect6');
      candidatesSelect6.empty();

      eleccount = electionsCount;

      

      for (var i = 1; i <= parseInt(electionsCount); i++) {
        
        document.getElementById("temp"+i).style.visibility = "visible";
        electionInstance.election(i).then(function(elections) {
          var id = elections[0];
          var name = elections[1];
          console.log(name);
          var ElectionId;
          electionInstance.CandidateCount().then(function(countyy)
          {
            for (var j = 1; j <= countyy; j++) 
          {

            electionInstance.candidate(j).then(function(candidates) 
            {
            
            ElectionId = candidates[1];
            if(ElectionId.toNumber() == id.toNumber())
            {
              candidateName = candidates[2];

             
              var candidateTemplate = "<tr><th>" + candidateName +"</th><td>"+ candidates[3] +"</td></tr>";
              var candidateOption = "<option value='" + candidates[0] + "' >" + candidates[2] + "</ option>";

              if(ElectionId.toNumber() == 1)
              {
               document.getElementById("tab1").innerHTML = name;
               
               
              candidatesResults1.append(candidateTemplate);
              
              candidatesSelect1.append(candidateOption);
               
              }
              else if(ElectionId.toNumber() == 2)
              {
                document.getElementById("tab2").innerHTML = name;
               candidatesResults2.append(candidateTemplate);
               
              candidatesSelect2.append(candidateOption);
              }

              else if(ElectionId.toNumber() == 3)
              {
                document.getElementById("tab3").innerHTML = name;
               candidatesResults3.append(candidateTemplate);
               
              candidatesSelect3.append(candidateOption);
              }

               else if(ElectionId.toNumber() == 4)
              {
                document.getElementById("tab4").innerHTML = name;
               candidatesResults4.append(candidateTemplate);
               
              candidatesSelect4.append(candidateOption);
              }

               else if(ElectionId.toNumber() == 5)
              {
                document.getElementById("tab5").innerHTML = name;
               candidatesResults5.append(candidateTemplate);
               
              candidatesSelect5.append(candidateOption);
              }
               else if(ElectionId.toNumber() == 6)
              {
                document.getElementById("tab6").innerHTML = name;
               candidatesResults6.append(candidateTemplate);
               
              candidatesSelect6.append(candidateOption);
              }
             
            }
          });

        }
          });
          return electionInstance.voters1(App.account);
    }).then(function(hasVoted1) {
      // Do not allow a user to vote
      if(hasVoted1) {

         $('#form1').hide();
       
      }

      var k = electionInstance.voters2(App.account);

      var m = Promise.resolve(k);

                    m.then(function(hasvoted2) {

                      if(hasvoted2)
                      {
                        $('#form2').hide();
                      }
            
          });

      var k3 = electionInstance.voters3(App.account);

      var m = Promise.resolve(k3);

                    m.then(function(hasvoted3) {

                      if(hasvoted3)
                      {
                        $('#form3').hide();
                      }
            
          });

      var k4 = electionInstance.voters4(App.account);

      var m = Promise.resolve(k4);

                    m.then(function(hasvoted4) {

                      if(hasvoted4)
                      {
                        $('#form4').hide();
                      }
            
          });

       var k5 = electionInstance.voters5(App.account);

      var m = Promise.resolve(k5);

                    m.then(function(hasvoted5) {

                      if(hasvoted5)
                      {
                        $('#form5').hide();
                      }
            
          });
      
       var k6 = electionInstance.voters6(App.account);

      var m = Promise.resolve(k6);

                    m.then(function(hasvoted6) {

                      if(hasvoted6)
                      {
                        $('#form6').hide();
                      }
            
          });
      
          loader.hide();
          content.show();

        });
      }
    }).catch(function(error) {
      console.warn(error);
    });
  },

check1: function() {
  App.electiontag = 1;
  startWebcam();
  },
  check2: function() {
    App.electiontag = 2;
    startWebcam();
  },
  check3: function() {
    App.electiontag = 3;
    startWebcam();
  },
  check4: function() {
    App.electiontag = 4;
    startWebcam();
  },
  check5: function() {
    App.electiontag = 5;
    startWebcam();
  },
  check6: function() {
    App.electiontag = 6;
    startWebcam();
  },

   checkface: function(name) {

     if(App.checker == true)
    {
    
  electionInstance.FaceCount().then(function(count)
          {
            for (var j = 1; j <= count; j++) 
          {

            electionInstance.votedface(j).then(function(facename)
            {

                facename2 = facename[0];
                console.log("checking with "+facename2+" "+name);
                if(facename2.localeCompare(name)==0 && facename[1]==App.electiontag)
                {

                   App.facecheck=false;
                    
                }
            });
          }

         
        });
}
else
{
  console.log("error");
}
  },

  addface: function(tag) {
    
    if(App.checker == true)
    {
    App.contracts.Election.deployed().then(function(instance) {
      return instance.addFace(facename,tag);
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
      App.checker = false;
      location.reload();
    }).catch(function(err) {
      console.error(err);
    });
    }
    else
    {
      console.log("error");
    }
  },

  castVote1: function() {
    
    if(App.checker == true)
    {
      var candidateId = $('#candidatesSelect1').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote1(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
      App.checker = false;
      location.reload();
    }).catch(function(err) {
      console.error(err);
    });
    }
    else
    {
      console.log("error");
    }
  },

  castVote2: function() {
    var candidateId = $('#candidatesSelect2').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote2(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
      location.reload();
      
    }).catch(function(err) {
      console.error(err);
    });
  },

   castVote3: function() {
    var candidateId = $('#candidatesSelect3').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote3(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
      location.reload();
      
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote4: function() {
    var candidateId = $('#candidatesSelect4').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote4(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
      location.reload();
      
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote5: function() {
    var candidateId = $('#candidatesSelect5').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote5(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
      location.reload();
      
    }).catch(function(err) {
      console.error(err);
    });
  },

  castVote6: function() {
    var candidateId = $('#candidatesSelect6').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote6(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
      location.reload();
      
    }).catch(function(err) {
      console.error(err);
    });
  },

  addElection: function() {
    
    var ename = document.getElementById("electionname").value;
    var c1 = document.getElementById("cand1").value;
    var c2 = document.getElementById("cand2").value;
    var c3 = document.getElementById("cand3").value;

    App.contracts.Election.deployed().then(function(instance) {
      return instance.addElections(ename,3);
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    
      
    }).catch(function(err) {
      console.error(err);
    });

     App.contracts.Election.deployed().then(function(instance) {
      return instance.addCandidate(parseInt(eleccount)+1,c1,0);
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
      
    }).catch(function(err) {
      console.error(err);
    });

    App.contracts.Election.deployed().then(function(instance) {
      return instance.addCandidate(parseInt(eleccount)+1,c2,0);
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
     
      
    }).catch(function(err) {
      console.error(err);
    });

    App.contracts.Election.deployed().then(function(instance) {
      return instance.addCandidate(parseInt(eleccount)+1,c3,0);
    }).then(function(result) {
      // Wait for votes to update
      location.reload();
      
    }).catch(function(err) {
      console.error(err);
    });

  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
/////////////////////////////////////////////////////////////////////////////////////////
function startWebcam() 
{
  video = document.getElementById('video');
  var facingMode = "user";
  var constraints = {
  audio: false,
  video: {
      facingMode: facingMode
  }
};
  navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
          video.srcObject = stream;
          });

  

  setTimeout(function() {
  snapshot();
},2000);
  
}
    

    var canvas, ctx;
    function init() {
      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext('2d');
    }

    function snapshot() {
       $("#content").hide();
       $("#loader").show();
        console.log("inside");
        ctx.drawImage(video, 0,0, canvas.width, canvas.height);
        var img1 = new Image();
        img1.src = canvas.toDataURL();
        datad = "{\r\n    \"image\":\"" + img1.src+ "\",\r\n    \"gallery_name\":\"ELECTION\"\r\n}"
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.kairos.com/recognize",
            "method": "POST",
            "headers": {
               "content-type": "application/json",
             "app_id": "5c2577b8",
              "app_key": "306c7b69f414726777c4f169f765592c",
              "cache-control": "no-cache"
            },
            "processData": false,
            "data": datad
        }
        $.ajax(settings).done(function (response) 
        {
            var m = response;
            
            
            if(JSON.stringify(m).indexOf("success") > -1) 
            {
               
                App.checker = true;

                
                App.checkface(JSON.stringify(m.images[0].candidates[0].subject_id));

                setTimeout(function kkk(){


                  console.log(App.facecheck);

                      if(App.facecheck)
                      {
                          if(App.electiontag == 1)
                {
                  App.castVote1();
                  facename =JSON.stringify(m.images[0].candidates[0].subject_id);
                  
                  App.addface(1);
                  App.electiontag == 0;
                }
                else if(App.electiontag == 2)
                {
                  App.castVote2();
                  facename =JSON.stringify(m.images[0].candidates[0].subject_id);
            
                  App.addface(2);
                  App.electiontag == 0;
                }
                 else if(App.electiontag == 3)
                {
                  App.castVote3();
                   facename =JSON.stringify(m.images[0].candidates[0].subject_id);
                 
                  App.addface(3);
                  App.electiontag == 0;
                }
                else if(App.electiontag == 4)
                {
                  App.castVote4();
                   facename =JSON.stringify(m.images[0].candidates[0].subject_id);
                 
                  App.addface(4);
                  App.electiontag == 0;
                }
                else if(App.electiontag == 5)
                {
                  App.castVote5();
                   facename =JSON.stringify(m.images[0].candidates[0].subject_id);
                 
                  App.addface(5);
                  App.electiontag == 0;
                }
                else if(App.electiontag == 6)
                {
                  App.castVote6();
                   facename =JSON.stringify(m.images[0].candidates[0].subject_id);
                
                  App.addface(6);
                  App.electiontag == 0;
                }
                      }
                      else
                      {
                        alert("Sorry You Have Already Voted");
                      }

                },2000);
                
                
            }
            else{
                console.log(App.checker);
                App.checker = false;
                alert("Sorry You Are Not Registered");
            }
        });
    }
 