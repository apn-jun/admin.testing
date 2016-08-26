

var showTransactions = function(contactsId) {
    //alert("Hi " + contactsId);

    
    ReactDOM.render(

      <EstimateBox contactsId={contactsId} />, document.getElementById("estimates")
    );
}
    
function EstimateList(props) {  
    return (
      <div><table className="table table-bordered">
        <thead><tr>
                <th>Transaction Date</th>
                <th>Estimate FileId</th>
                
                <th>Created</th>
                </tr></thead><tbody>

        {props.data.map(function(item, i) {
            return (
                 <tr key={i}>
                    <td>{item.transactionDate}</td>
                    <td>{item.estimateFileId}</td>
                    <td>{item.created}</td>
                    
                </tr>

             
          );
        })}
</tbody></table></div>
  );
}


var EstimateBox = React.createClass({

    loadEstimates: function() {
        $.ajax({
            url: "api/transactions/"+this.props.contactsId+"/all" ,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data,statusMessage: ''});
                
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
        this.loadEstimates();
       
    },

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        this.setState({data: [],statusMessage: 'loading...'});
        if (nextProps.contactsId !== this.state.contactsId) {
            this.loadEstimates();
        }
    },

    render: function() {
  
        return (
          
          <div className="EstimateBox">
            <div className="status">{this.state.statusMessage}</div>
            <EstimateList data={this.state.data}  />
           
          </div>
      );
    }
});


var TransactionList = React.createClass({
    
    

    render: function() {
        

        var cNodes = this.props.data.map(function(transaction) {
            return (
                <tr key={transaction.contactsId}>
                    <td><span onClick={showTransactions.bind(this, transaction.contactsId)}>{transaction.contactsId}</span></td>
                    <td>{transaction.totalEstimates}</td>
                    <td>$ {transaction.totalRebate}</td>
                </tr>
              );
              }.bind(this));

              return (
                  <div>
          <table className="table table-bordered">
            <thead><tr>
                <th>ContactsId</th>
                <th>Count</th>
                <th>Total Rebate</th>
                </tr></thead>
            <tbody>
            {cNodes}
            </tbody>
          </table>
           
        </div>
      );
    }
});


        

   
      var TransactionBox = React.createClass({

    loadTransactions: function() {
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

 
    getInitialState: function() {
        return {data: []};
    },
    
    componentDidMount: function() {
        this.loadTransactions();
       
    },

    render: function() {
  
        return (
          <div className="TransactionBox">
            <TransactionList data={this.state.data}  />
           
          </div>
      );
    }
});




ReactDOM.render(
  <TransactionBox url="api/transactions" />,
  document.getElementById("transactions")
);