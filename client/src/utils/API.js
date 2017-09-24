import axios from "axios";

// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  searchAll: function() {
    return axios.get("/api/all");
  },
  getPins : function(){
    return axios.get("/api/pins")
  },
  getFigurines : function(){
    return axios.get("/api/figurines")
  },
  getJewelry : function(){
    return axios.get("/api/jewelry")
  },
  getSale : function(){
    return axios.get("/api/sale")
  },
  getPopular: function(){
    return axios.get("/api/popular")
  },
  getFeatured: function(){
    return axios.get("/api/featured")
  }

};