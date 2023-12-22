<div className=" main_panel_search_section w-[600px] lg:w-[600px] ">
          <div className="flex justify-start items-center rounded-full w-[200px] h-[30px] lg:w-[400px] lg:h-[40px] p-[7px] main_panel_search_bar">
            <FontAwesomeIcon icon={faSearch} style={{ color: "#acacac" }} />
            <input
              type="text"
              placeholder="Search"
              className="w-[150px] lg:w-[400px] lg:text-md"
            />
          </div>
          <button
            className="text-sm rounded-full px-1 py-[7px] main_panel_create_button"
            onClick={() => {
              navigate("/createPost");
            }}
          >
            <FontAwesomeIcon icon={faPlus} style={{ color: "#ffffff" }} />
            <span className="text">Create New Post</span>
          </button>
          {/* <div className="block lg:hidden">
            <UserProfile friend={user} isadmin={true} />
          </div> */}
        </div>
      </div>