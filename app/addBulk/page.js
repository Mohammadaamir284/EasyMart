"use client"


const page = () => {

    const handelbulkadd = async () => {
        let res = await fetch('/info.json')
        let data = await res.json()
        console.log(data)

        const upload = await fetch("/api/bulk/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (upload.ok) {
            alert("Products uploaded")
        } else {
            alert("Uploaded Failed")
        }
    }


    return (
        <>
            <div className='flex items-center justify-center mt-40'>
                <button
                    onClick={handelbulkadd}
                    className='p-4 rounded-lg bg-blue-600 text-white hover:bg-blue-800'>ADD Bulk Data</button>
            </div>
        </>
    )
}

export default page