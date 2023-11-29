import React, { Component } from 'react';

// import {Redirect} from 'react-router-dom'; 
import direction from './assets/images/direction.png';
import truck from './assets/images/truck.png';
import truckimg from './assets/images/truck_img.png';
import car from './assets/images/car.png';
import rider from './assets/images/rider.png';
import routestart from './assets/images/route-start.svg';
import routedrive from './assets/images/route-drive.svg';
import routestop from './assets/images/route-stop.svg';
import MyMap from './component/MyMap';
import $ from 'jquery'; 

class Home extends Component {
    
  constructor() {
    super();
    this.state = {
        branches: [],
        selectedBranch: '',
        drivers: [],
        searchQuery: '',
        };
  }

  componentDidMount() 
  {
        $(document).ready(function(){
        
            $('ul.tabs li').click(function(){
                var tab_id = $(this).attr('data-tab');
        
                $('ul.tabs li').removeClass('current');
                $('.tab-content').removeClass('current');
        
                $(this).addClass('current');
                $("#"+tab_id).addClass('current');
            })
        
        })
    
    
        $(".sideicon").click(function(){
            $(".sidebar").fadeIn();
        });
        $(".routing_head h4 i").click(function(){
            $(".sidebar").fadeOut();
        });

        // Fetch branches from the specified API endpoint
        fetch('http://localhost:3001/api/branches')
        .then(response => response.json())
        .then(data => {
            this.setState({ branches: data });
        })
        .catch(error => {
            console.error('Error fetching branches:', error);
        });

        $('#All').on('click', this.handleCheckAll);
  }
    
  componentWillUnmount() {

    $('#All').off('click', this.handleCheckAll);

  }    
 

  fetchDrivers = (branchId) => {
            // Fetch drivers for the selected branch from the drivers API
            fetch(`http://localhost:3001/api/getDrivers/${branchId}`)
              .then(response => response.json())
              .then(data => {
                this.setState({ drivers: data });
              })
              .catch(error => {
                console.error('Error fetching drivers:', error);
              });
              
  } 
  
  handleSearch = () => {
    const searchTerm = $('#searchInput').val().toLowerCase();
    const filteredDrivers = this.state.drivers.filter(driver =>
      driver.name.toLowerCase().includes(searchTerm)
    );

    // Update the state with the filtered results
    this.setState({
      filteredDrivers,
    });
  };

  handleBranchChange = (event) => {
    const selectedBranch = event.target.value;
    this.setState({ selectedBranch, drivers: [] });

    if (selectedBranch) {
      // Fetch drivers when a branch is selected
      this.fetchDrivers(selectedBranch);
    }
  };

  handleCheckAll = () => {
    // Use jQuery to check all checkboxes with class 'checkboxGroup'
    $('.checkboxGroup').prop('checked', $('#All').prop('checked'));
  };

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };
  render() {
    const { branches, selectedBranch, drivers } = this.state;

    const { searchQuery } = this.state;

     // Filter drivers based on the search query
     const filteredDrivers = drivers.filter((driver) =>
     driver.name.toLowerCase().includes(searchQuery.toLowerCase())
   );
    
    return (

      <React.Fragment>
        <div className="sideicon">
    <img src={direction} alt="" />
</div>


<section className="topbar">
    <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-5 sidegapp map_data">
            <ul>
                <li><a  href="#"><i className="feather icon-map-pin"></i> Map</a></li>
                <li><a  href="#"><i className="feather icon-list"></i> Data</a></li>
                <li><a  href="#"><i className="feather icon-refresh-ccw"></i> Undo</a></li>
            </ul>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-5 sidegapp middle_head">
            <h4><b>EloERP</b> Location Service</h4>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-2 sidegapp map_data right_bar">
            <ul>
                <li><a href="#"><i className="feather icon-map-pin"></i> </a></li>
                <li><a href="#"><i className="feather icon-user-plus"></i> </a></li>
            </ul>
        </div>
    </div>
</section>


<div className="row">
    <div className="col-lg-3 col-md-4 sidegapp sidebar">

        <div className="routing_head">
            <h4> Routing Directions2 <i className="feather icon-x"></i></h4>
        </div>
        <div className="tabs_box">
            <ul className="tabs">
                <li className="tab-link current" data-tab="tab-1">Live</li><li className="tab-link" data-tab="tab-2">History</li>
            </ul>

            <div id="tab-1" className="tab-content current">
                <div className="widget_categories">
                    <div className="date_selector">
                        <div className="row">
                            <div className="col-lg-6 search_Bar">
                                <i className="feather icon-search"></i>
                                <input type="text" value={searchQuery}
                                        onChange={this.handleSearchChange}
                                        placeholder="Search for a driver..." />
                            </div>
                            <div className="col-lg-6 input_Bar">
                                <input type="date" name="" />
                            </div>
                        </div>
                        <div className="row mt-1">
                        <div className="col-lg-3"> <label htmlFor="branches">Branches:</label></div>
                            <div className="col-lg-9 input_Bar">

                            <select value={selectedBranch} onChange={this.handleBranchChange}>
                                <option value="">Select a branch</option>
                                {branches.map(branch => (
                                    <option key={branch.id} value={branch.id}>
                                    {branch.name}
                                    </option>
                                ))}
                                </select>
            
                            </div>
                        </div>
                    </div>
                    
                        <li>
                          <a href="#">
                                <div className="form-group">
                                  <input type="checkbox" className="All" id="All" />
                                  <label htmlFor="All">All</label>
                                </div>
                            </a>
                        </li>
                    <ul>
                   
                                            
                        {filteredDrivers.map(driver => (
                            <li key={driver.id}>
                                <a href="#">
                                            <div className="form-group">
                                            <input type="checkbox" className='checkboxGroup' id="Rider{driver.id}"/>
                                            <label htmlFor="Rider{driver.id}"><img src={car} alt="" />{driver.name} <span>2022-01-22 07:18:04</span></label>
                                            </div>
                                        </a>
                            </li>
                
                        ))}
                        
                  </ul>
                </div>
            </div>
            <div id="tab-2" className="tab-content">
                <div className="widget_categories">
                    <div className="date_selector">
                        <div className="row">
                            <div className="col-lg-6 search_Bar">
                                <i className="feather icon-search"></i>
                                <input type="text" placeholder="Search" name="" />
                            </div>
                            <div className="col-lg-6 input_Bar">
                                <input type="date" name="" />
                            </div>
                        </div>
                    </div>
                    <div className="row from_to_time">
                        <div className="col-lg-3 sidegapp time_head">
                            <p>Time from</p>
                        </div>
                        <div className="col-lg-9 sidegapp">
                            <div className="row ">
                                <div className="col-lg-6 col-md-6 datepiker date_picker">
                                    <input type="date" name="" />
                                </div>
                                <div className="col-lg-3 col-md-3 sidegapp datepiker">
                                    <select>
                                        <option>00</option>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-3 datepiker" id="date_select">
                                    <select>
                                        <option>00</option>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                        <option>25</option>
                                        <option>26</option>
                                        <option>27</option>
                                        <option>28</option>
                                        <option>29</option>
                                        <option>30</option>
                                        <option>30</option>
                                        <option>31</option>
                                        <option>32</option>
                                        <option>33</option>
                                        <option>34</option>
                                        <option>35</option>
                                        <option>36</option>
                                        <option>37</option>
                                        <option>38</option>
                                        <option>39</option>
                                        <option>40</option>
                                        <option>41</option>
                                        <option>42</option>
                                        <option>43</option>
                                        <option>44</option>
                                        <option>45</option>
                                        <option>46</option>
                                        <option>47</option>
                                        <option>48</option>
                                        <option>49</option>
                                        <option>50</option>
                                        <option>51</option>
                                        <option>52</option>
                                        <option>53</option>
                                        <option>54</option>
                                        <option>55</option>
                                        <option>56</option>
                                        <option>57</option>
                                        <option>58</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row from_to_time">
                        <div className="col-lg-3 sidegapp time_head">
                            <p>Time To</p>
                        </div>
                        <div className="col-lg-9 sidegapp">
                            <div className="row ">
                                <div className="col-lg-6 col-md-6 datepiker date_picker">
                                    <input type="date" name="" />
                                </div>
                                <div className="col-lg-3 col-md-3 sidegapp datepiker">
                                    <select>
                                        <option>00</option>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-3 datepiker" id="date_select">
                                    <select>
                                        <option>00</option>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                        <option>05</option>
                                        <option>06</option>
                                        <option>07</option>
                                        <option>08</option>
                                        <option>09</option>
                                        <option>10</option>
                                        <option>11</option>
                                        <option>12</option>
                                        <option>13</option>
                                        <option>14</option>
                                        <option>15</option>
                                        <option>16</option>
                                        <option>17</option>
                                        <option>18</option>
                                        <option>19</option>
                                        <option>20</option>
                                        <option>21</option>
                                        <option>22</option>
                                        <option>23</option>
                                        <option>24</option>
                                        <option>25</option>
                                        <option>26</option>
                                        <option>27</option>
                                        <option>28</option>
                                        <option>29</option>
                                        <option>30</option>
                                        <option>30</option>
                                        <option>31</option>
                                        <option>32</option>
                                        <option>33</option>
                                        <option>34</option>
                                        <option>35</option>
                                        <option>36</option>
                                        <option>37</option>
                                        <option>38</option>
                                        <option>39</option>
                                        <option>40</option>
                                        <option>41</option>
                                        <option>42</option>
                                        <option>43</option>
                                        <option>44</option>
                                        <option>45</option>
                                        <option>46</option>
                                        <option>47</option>
                                        <option>48</option>
                                        <option>49</option>
                                        <option>50</option>
                                        <option>51</option>
                                        <option>52</option>
                                        <option>53</option>
                                        <option>54</option>
                                        <option>55</option>
                                        <option>56</option>
                                        <option>57</option>
                                        <option>58</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="info_show">
                        <table className="tablebox">
                        <tbody>
                          <tr>
                            <th>Time</th>
                            <th>Information</th>
                          </tr>
                          <tr>
                            <td colSpan="12"><img src={routestart} alt="" /> 2022-01-22 01:07:03  </td>
                          </tr>
                          <tr>
                            <td colSpan="12"><img src={routedrive} alt="" /> 2022-01-22 01:07:03  4 min 45 s  </td>
                          </tr>
                          <tr>
                            <td colSpan="12"><img src={routestop} alt="" /> 2022-01-22 01:11:48  6 min 18 s  </td>
                          </tr>

                          <tr>
                            <td colSpan="12"><img src={routestart} alt="" /> 2022-01-22 01:18:06  38 min 0 s  </td>
                          </tr>
                          <tr>
                            <td colSpan="12"><img src={routedrive} alt="" /> 2022-01-22 01:07:03  </td>
                          </tr>
                          <tr>
                            <td colSpan="12"><img src={routestop} alt="" /> 2022-01-22 01:11:48  6 min 18 s  </td>
                          </tr>
                          <tr>
                            <td colSpan="12"><img src={routedrive} alt="" /> 2022-01-22 01:07:03  4 min 45 s  </td>
                          </tr>
                          <tr>
                            <td colSpan="12"><img src={routestop} alt="" /> 2022-01-22 01:11:48  6 min 18 s  </td>
                          </tr>

                          <tr>
                            <td colSpan="12"><img src={routestart} alt="" /> 2022-01-22 01:18:06  38 min 0 s  </td>
                          </tr>
                          <tr>
                            <td colSpan="12"><img src={routedrive} alt="" /> 2022-01-22 01:07:03  4 min 45 s  </td>
                          </tr>
                          </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    <div className="col-lg-9 col-md-8 sidegapp">
        <div className="mapbox">
            <MyMap />
            {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3373.009121661994!2d72.27803311450427!3d32.28473271623095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39213c4da5255709%3A0xd3d79b51db35823c!2sIT%20Vision%20(Private)%20Limited!5e0!3m2!1sen!2s!4v1642746109654!5m2!1sen!2s" width="100%" height="100vh"  allowfullscreen="" loading="lazy"></iframe> */}
            <div className="rider_bike">
                <img src={rider} alt="" />
            </div>
            <div className="rider_bike_1">
                <img src={rider} alt="" />
            </div>
            <div className="rider_bike_2">
                <img src={rider} alt="" />
            </div>
        </div>
    </div>
</div>
      </React.Fragment>
    )
  }
}
export default Home;
