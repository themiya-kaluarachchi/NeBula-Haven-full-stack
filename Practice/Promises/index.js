// console.log("Promises in JavaScript");
// console.log("----------------------");

// let winner = "Themiya Kaluarachchi";
// let isJudgeBoardOkay = true;

// const myPromise = new Promise(
//     (resolve, reject) => {

//         setTimeout(
//             () => {
//                 if (isJudgeBoardOkay) {
//                     console.log("The winner is " + winner);
//                     resolve({
//                         name: winner,
//                         prize: "Gold Medal",
//                         marks: 98
//                     })
//                 } else {
//                     reject({
//                         reason: "You are Black",
//                         message: "The judge board does not allow this participant."
//                     })
//                 }
//             }, 5000
//         )
//     }
// )

// myPromise.then(
//     (a) => {
//         console.log(a);
//         console.log(`Congratulations ${winner}, you have won the competition!`);
//     }
// ).catch (
//     (error) => {
//         console.log(error);
//         console.log("Sorry, the judge board is not okay. Please try again later.");
//     }
// )



function getUsers(dbPassword) {

    const myPromise = new Promise(
        (resolve, reject) => {

            if (dbPassword == "123") {
                setTimeout(
                    () => {
                        resolve(
                            [
                                { name: "Alice", age: 30 },
                                { name: "Bob", age: 25 },
                                { name: "Charlie", age: 35 }
                            ]
                        )
                    }, 5000
                );
            } else {
                reject(
                    {
                        message : "Invalid database password."
                    }
                )
            }
        }
    );
    return myPromise;
}

// getUsers("123").then(
//     (users) => {
//         console.log(users);
//     }
// ).catch (
//     (error) => {
//         console.log(error);
//     }
// )

async function fetchUsers() {
    try {
        let users = await getUsers("123");
        console.log(users);
        console.log("Users fetched successfully.");
    } catch (error) {
        console.log(error);
        console.log("Failed to fetch users.");
    }

}

fetchUsers();