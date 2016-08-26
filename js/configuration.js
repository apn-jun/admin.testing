


var ConfigurationList = React.createClass({
    

    handleEdit: function(id) {
        this.setState({selectOEMId: id});
        console.log('intial oemid: ' + id);
    },

    render: function() {
        

        var cNodes = this.props.data.map(function(configuration) {
            return (
                <tr key={configuration.id}>
                    <td>{configuration.oemId}
                    {/*
                    <a><span  onClick={this.handleEdit.bind(this, configuration.id)} className="glyphicon glyphicon-pencil"></span></a>
                    */}
                    </td>
                    <td>{configuration.oem}</td>
                    <td>{configuration.rebatePercent}</td>
                    <td>{configuration.startDate}</td>
                    <td>{configuration.oemPopularParts== true?"✔":""}</td>
                    <td>{configuration.conquested == true?"✔":""}</td>
                    <td>{configuration.msrpPercentage}</td>

                    
{/*
                    <td>{configuration.oemCategorized== true?"✔":""}</td>
                    <td>{configuration.oemRequirements== true?"✔":""}</td>
                    <td>{configuration.notOnCollisionLink== true?"✔":""}</td>
                    <td>{configuration.containsOEParts== true?"✔":""}</td>
                    */}
                    
                    <td>{configuration.oeParts100Percent== true?"✔":""}</td>

                </tr>
              );
              }.bind(this));

              return (
                  <div>
          <table className="table table-bordered">
            <thead><tr><th>OEM Id</th><th>OEM</th>
            <th>Rebate Percent</th>
            <th>Start Date</th>
            <th>OEM Popular Parts</th>
            
            <th>Conquested</th>
            <th>MSRP %</th>
            {/*<th>oemCategorized</th>
            <th>oemRequirements</th>
            <th>notOnCollisionLink</th>
            <th>containsOEParts</th>
            */}
            
            <th>OEM Parts 100%</th>
            </tr></thead>
            <tbody>
            {cNodes}
            </tbody>
          </table>
           
        </div>
      );
    }
});


        

      var ConfigurationForm = React.createClass({


          getInitialState: function() {
              return {id: '0', oemId: '4', startDate: '1/1/2016', conquested:false, oemCategorized:true,oemRequirements:true,notOnCollisionLink:true, containsOEParts:true,oemPopularParts:true,
                  oeParts100Percent:false,msrpPercentage:'10',rebatePercent:'6.25'
              };
          },
          handleStartDateChange: function(e) {
              this.setState({startDate: e.target.value});
          },
          handleRebatePercentChange: function(e) {
              this.setState({rebatePercent: e.target.value});
          },
          handleMSRPPercentageChange: function(e) {
              this.setState({msrpPercentage: e.target.value});
          },


          handleOEMChange: function(e) {
              this.setState({oemId: e.target.value});
          },
          handleCheckboxChange: function(e) {
              if (e.target.id == "conquested")
                  this.setState({conquested: e.target.checked});
              else if (e.target.id == "oemCategorized")
                  this.setState({oemCategorized: e.target.checked});
              else if (e.target.id == "oemRequirements")
                  this.setState({oemRequirements: e.target.checked});
              else if (e.target.id == "notOnCollisionLink")
                  this.setState({notOnCollisionLink: e.target.checked});
              else if (e.target.id == "containsOEParts")
                  this.setState({containsOEParts: e.target.checked});
              else if (e.target.id == "oemPopularParts")
                  this.setState({oemPopularParts: e.target.checked});
              else if (e.target.id == "oeParts100Percent")
                  this.setState({oeParts100Percent: e.target.checked});

          },
          handleSubmit: function(e) {
              e.preventDefault();
              var startDate = this.state.startDate.trim();
              var rebatePercent = this.state.rebatePercent.trim();
              var msrpPercentage = this.state.msrpPercentage.trim();
              var id = this.state.id.trim();
              var conquested = this.state.conquested;
              var oemCategorized = this.state.oemCategorized;
              var oemRequirements= this.state.oemRequirements;
              var notOnCollisionLink= this.state.notOnCollisionLink;
              var containsOEParts= this.state.containsOEParts;
              var oemPopularParts= this.state.oemPopularParts;
              var oeParts100Percent= this.state.oeParts100Percent;
              var oemId = this.state.oemId;
              if (!id || !startDate) {
                  return;
              }
              this.props.onConfigurationSubmit({id: id, oemId: oemId, startDate: startDate, conquested:conquested, 
                  oemCategorized:oemCategorized,oemRequirements:oemRequirements,notOnCollisionLink:notOnCollisionLink, containsOEParts:containsOEParts,oemPopularParts:oemPopularParts,
                  oeParts100Percent:oeParts100Percent,msrpPercentage:msrpPercentage,rebatePercent:rebatePercent});
              
              {/*this.setState({id: '0', oemId: 1, startDate: startDate, conquested:false, oemCategorized:false,oemRequirements:false,notOnCollisionLink:false, containsOEParts:false,oemPopularParts:false,
                  oeParts100Percent:false,msrpPercentage:'10'
              });
              */}
          },
          render: function() {
              var oemNodes = [];
              if (this.props.data) {
                  oemNodes = this.props.data.map(function(oem) {
                      return (
                          <option  key={oem.id} value={oem.id}>{oem.companyName}</option>
                  );
                  });
              }


        return (
         <form className="configurationForm" onSubmit={this.handleSubmit}>
            <input type="hidden" id="id" value={this.state.id} /> 

            <label>OEM:</label>
            <select id="oemId" value={this.state.oemId} onChange={this.handleOEMChange}>
              {oemNodes}
            </select> <br />
            
            <label>Rebate%: </label>
            <input id="rebatePercent" className="percentage" type="text" value={this.state.rebatePercent}
          onChange={this.handleRebatePercentChange} />  <br />


            <label>Start Date: </label>
            <input id="startDate" className="startdate" type="text" value={this.state.startDate}
            onChange={this.handleStartDateChange} />  <br />
            
            
            
            
            {/*
            <input id="oemCategorized" type="checkbox" checked={this.state.oemCategorized}  onChange={this.handleCheckboxChange}  /> OEM categorized<br />
            <input id="oemRequirements" type="checkbox" checked={this.state.oemRequirements}  onChange={this.handleCheckboxChange} /> OEM Requirements (TBD by AP / OEM<br />
            <input id="notOnCollisionLink" type="checkbox" checked={this.state.notOnCollisionLink}  onChange={this.handleCheckboxChange} /> Not on OEM collisionLink program through AP<br />
            <input id="containsOEParts" type="checkbox" checked={this.state.containsOEParts}  onChange={this.handleCheckboxChange} /> Estimate contains OE (PAN / PAP) parts<br />
            */}
            <input id="oemPopularParts" type="checkbox" checked={this.state.oemPopularParts}  onChange={this.handleCheckboxChange} /> OEM Popular Parts<br />
            <span className="marginleft" ><input id="conquested" type="checkbox" checked={this.state.conquested}  onChange={this.handleCheckboxChange} /> Conquested </span><br />
            <span className="marginleft">MSRP %: </span>
            <input id="msrpPercentage" className="marginleft percentage" type="text" value={this.state.msrpPercentage}
            onChange={this.handleMSRPPercentageChange} /> <br />


            <input id="oeParts100Percent" type="checkbox" checked={this.state.oeParts100Percent}  onChange={this.handleCheckboxChange} /> OEM Parts 100%<br />
            <input type="submit" value="save" />
          </form>
      );
    }
});

var ConfigurationBox = React.createClass({

    loadConfigurations: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    loadOEMs: function() {
        $.ajax({
            url: this.props.url+"/oems",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({oems: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },



    handleConfigurationSubmit: function(configuration) {
        $.ajax({
            url: this.props.url+'/save',
            dataType: 'json',
            type: 'POST',
            data: configuration,
            success: function(data) {
                this.loadConfigurations();
                //this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function() {
        return {data: []};
    },
    
    componentDidMount: function() {
        this.loadConfigurations();
        this.loadOEMs();
    },

    render: function() {
  
        return (
          <div className="configurationBox">
            <ConfigurationList data={this.state.data}  />
            <ConfigurationForm data={this.state.oems} onConfigurationSubmit={this.handleConfigurationSubmit}  />
          </div>
      );
    }
});




ReactDOM.render(
  <ConfigurationBox url="api/configurations" />,
  document.getElementById("configuration")
);