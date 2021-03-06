/*!
 * is-type-of - test/is.test.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var is = require('..');
var should = require('should');
var Long = require('long');

describe('is', function () {
  describe('finite', function () {
    it('should true', function () {
      is.finite(37);
    });

    it('should false', function () {
      is.finite(NaN);
      is.finite(Number.NaN);
      is.finite(0 / 0)
      is.finite(undefined);
      is.finite({});

      is.finite(true);
      is.finite(null);
 
      is.finite("37");
      is.finite("37.37");
      is.finite("");
      is.finite(" ");
      is.finite("NaN");
      is.finite("blabla");
    });
  });
  describe('NaN', function () {
    it('should true', function () {
      is.NaN(NaN);
      is.NaN(Number.NaN);
      is.NaN(0 / 0)
    });

    it('should false', function () {
      is.NaN(undefined);
      is.NaN({});

      is.NaN(true);
      is.NaN(null);
      is.NaN(37);

      is.NaN("37");
      is.NaN("37.37");
      is.NaN("");
      is.NaN(" ");
      is.NaN("NaN");
      is.NaN("blabla");
    });
  });
  describe('generator', function () {
    it('should true', function () {
      var gen = function *() {
        yield 1;
        return 2;
      };
      is.generator(gen()).should.equal(true);
    });

    it('should false', function () {
      var gen = function *() {};
      var fun = function () {};
      var obj = {};
      is.generator(gen).should.equal(false);
      is.generator(fun).should.equal(false);
      is.generator(obj).should.equal(false);
    });
  });

  describe('generatorFunction', function () {
    it('should true', function () {
      var gen = function *() {
        yield 1;
        return 2;
      };
      is.generatorFunction(gen).should.equal(true);
    });

    it('should false', function () {
      var gen = function *() {};
      var fun = function () {};
      var obj = {};
      is.generatorFunction(gen()).should.equal(false);
      is.generatorFunction(fun).should.equal(false);
      is.generatorFunction(obj).should.equal(false);
    });
  });

  describe('promise', function () {
    it('should true', function () {
      var pro = {
        then: function () {}
      };
      is.promise(pro).should.equal(true);
    });

    it('should false', function () {
      var hasthen = {then: 1};
      var obj = {};
      var number = 1;
      is.promise(hasthen).should.equal(false);
      is.promise(obj).should.equal(false);
      is.promise(number).should.equal(false);
    });
  });

  describe('int', function () {
    it('should true', function () {
      is.int(0).should.equal(true);
      is.int(-100).should.equal(true);
      is.int(100).should.equal(true);
      is.int(Math.pow(2, 31)).should.equal(true);
      is.int(Math.pow(2, 50)).should.equal(true);
      is.int(-Math.pow(2, 31)).should.equal(true);
      is.int(-Math.pow(2, 50)).should.equal(true);
    });

    it('should false', function () {
      is.int(0.1).should.equal(false);
      is.int(-0.1).should.equal(false);
      is.int(-111110.1).should.equal(false);
      is.int(11110.12312321).should.equal(false);
      is.int('1.1').should.equal(false);
    });
  });

  describe('int32', function () {
    it('should true', function () {
      is.int32(0).should.equal(true);
      is.int32(-100).should.equal(true);
      is.int32(100).should.equal(true);
      is.int32(Math.pow(2, 31) - 1).should.equal(true);
      is.int32(-Math.pow(2, 31)).should.equal(true);
    });

    it('should false', function () {
      is.int32(Math.pow(2, 31)).should.equal(false);
      is.int32(Math.pow(2, 50)).should.equal(false);
      is.int32(-Math.pow(2, 31) - 1).should.equal(false);
      is.int32(-Math.pow(2, 50)).should.equal(false);
      is.int32(-Math.pow(2, 63)).should.equal(false);
      is.int32(0.1).should.equal(false);
      is.int32(-0.1).should.equal(false);
      is.int32(-111110.1).should.equal(false);
      is.int32(11110.12312321).should.equal(false);
      is.int32('1.1').should.equal(false);
    });
  });

  describe('long', function () {
    it('should true', function () {
      is.long(Math.pow(2, 31)).should.equal(true);
      is.long(Math.pow(2, 50)).should.equal(true);
      is.long(-Math.pow(2, 31) - 1).should.equal(true);
      is.long(-Math.pow(2, 50)).should.equal(true);
      is.long(-Math.pow(2, 63)).should.equal(true);
    });

    it('should false', function () {
      is.long(0.1).should.equal(false);
      is.long(-0.1).should.equal(false);
      is.long(-111110.1).should.equal(false);
      is.long(11110.12312321).should.equal(false);
      is.long('1.1').should.equal(false);
      is.long(0).should.equal(false);
      is.long(-100).should.equal(false);
      is.long(100).should.equal(false);
      is.long(Math.pow(2, 31) - 1).should.equal(false);
      is.long(-Math.pow(2, 31)).should.equal(false);
    });
  });

  describe('Long', function () {
    it('should true', function () {
      is.Long(Long.fromNumber(Math.pow(2, 31))).should.equal(true);
      is.Long(Long.fromString('1024102410241024')).should.equal(true);
    });

    it('should false', function () {
      is.Long(123).should.equal(false);
    });
  })

  describe('double', function () {
    it('should true', function () {
      is.double(0.1).should.equal(true);
      is.double(-0.1).should.equal(true);
      is.double(-111110.1).should.equal(true);
      is.double(11110.12312321).should.equal(true);
    });

    it('should false', function () {
      is.double(0).should.equal(false);
      is.double(-100).should.equal(false);
      is.double(100).should.equal(false);
      is.double(Math.pow(2, 31)).should.equal(false);
      is.double(Math.pow(2, 50)).should.equal(false);
      is.double(-Math.pow(2, 31)).should.equal(false);
      is.double(-Math.pow(2, 50)).should.equal(false);
    });
  });
});
