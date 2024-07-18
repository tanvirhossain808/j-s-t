import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    // const { comments } = useContext(StoreContext)
    // console.log(comments, "from comment");
    const request = await req.json()
    const { id } = request;
    console.log(id);
    try {
        const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        const comments = await data.json()
        return NextResponse.json(comments)
    } catch (error: any) {
        console.log(error?.message)
    }
    return NextResponse.json({ success: true, message: "hey" })
}


// pages/api/get.js
;
// import { NextRequest, NextResponse } from "next/server";


// // connect()


// export async function GET(request: NextRequest) {
//     try {

//         //send verification email

//         return NextResponse.json({
//             message: "User created successfully",
//             success: true,
//         })




//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 })

//     }
// }