async function toRazorPay(e) {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:4000/buypremium", {
        headers: {
          Authorization: token,
        },
      });
  
      if (response.status === 201) {
        const options = {
          // order detail we get from the backend so no one can manipulate them directly
          key: response.data.data.key_id,
          order_id: response.data.data.order.id,
          handler: async (result) => {
            //console.log(result);
            try {
              await axios.post("http://localhost:4000/update_transaction", {
                order_id: options.order_id,
                payment_id: result.razorpay_payment_id,
              }, {
                headers: {
                  Authorization: token,
                },
              });
              alert("You are a premium user now");
              document.getElementById("Premium").removeAttribute("hidden");
              buyPremium.setAttribute("hidden", "");
              document.getElementById("openleaderboard").removeAttribute("hidden");
              document.getElementById("gotoIncomeNExpense").removeAttribute("hidden");
            } catch (err) {
              console.log(err);
              alert(err.response.data.message);
            }
          },
        };
  
        // Create a new object of Razorpay
        const payrazor = new window.Razorpay(options);
  
        // Open the Razorpay modal
        payrazor.open();
        e.preventDefault();
  
        // Handle payment failure
        payrazor.on("payment.failed", async (response) => {
          //console.log(response);
          try {
            await axios.post("http://localhost:4000/failed_transaction", {
              order_id: response.error.metadata.order_id,
              payment_id: response.error.metadata.payment_id,
            }, {
              headers: {
                Authorization: token,
              },
            });
            alert("TRANSACTION FAILED.");
          } catch (err) {
            console.log(err);
            alert(err.response.data.message);
          }
        });
      }
    } catch (err) {
      console.log(err);
      
    }
  }
  