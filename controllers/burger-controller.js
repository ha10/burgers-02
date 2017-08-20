var express = require('express');
var path = require("path");
var db = require("../models");

module.exports = function (app) {

  app.get("/", function (req, res) {
    db.Burger.findAll({})
      .then(function (result) {
        res.render('index', {
          burgers: result
        });
      });
  });

  app.get("/api", function (req, res) {
    db.Burger.findAll({})
      .then(function (result) {
        res.json(result);
      });
  });

  app.post("/", function (req, res) {
    console.log(req.body);
    db.Burger.create({
        burger_name: req.body.burger_name,
        devoured: req.body.devoured
      })
      .then(function (result) {
        res.redirect('/');
      });
  });

  app.delete("/:id", function (req, res) {
    console.log("delete hit");
    db.Burger.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function (result) {
        res.redirect('/');
      });
  });

  app.put("/:id", function (req, res) {
    db.Burger.update({
        devoured: req.body.devoured
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(function (result) {
        res.redirect('/');
      });
  });
};