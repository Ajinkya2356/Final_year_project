

const Navbar = () => {
    const worker = {
        id: "W12345",
        name: "John Doe",
        profilePhoto:
            "https://via.placeholder.com/40",
    }
    return (
        <div className="container mx-auto  w-full ">
            <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center w-full">
                <div className="text-xl font-bold">Worker Dashboard</div>
                <div className="flex items-center space-x-4">
                    <div>
                        <p className="text-white">{worker.name}</p>
                        <p className="text-white text-sm">ID: {worker.id}</p>
                    </div>
                    <img
                        src={worker.profilePhoto}
                        alt="Worker Profile"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                </div>
            </nav>
        </div>
    )
}

export default Navbar