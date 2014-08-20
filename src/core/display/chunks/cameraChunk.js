SceneJS_ChunkFactory.createChunkType({

    type: "camera",

    build : function() {

        this._uPMatrixDraw = this.program.draw.getUniformLocation("SCENEJS_uPMatrix");
        this._uZNearDraw = this.program.draw.getUniformLocation("SCENEJS_uZNear");
        this._uZFarDraw = this.program.draw.getUniformLocation("SCENEJS_uZFar");

        this._uPMatrixPick = this.program.pick.getUniformLocation("SCENEJS_uPMatrix");
        this._uZNearPick = this.program.pick.getUniformLocation("SCENEJS_uZNear");
        this._uZFarPick = this.program.pick.getUniformLocation("SCENEJS_uZFar");
    },

    draw : function(frameCtx) {

        if (this.core.dirty) {
            this.core.rebuild();
        }

        var gl = this.program.gl;

        if (this._uPMatrixDraw) {
            gl.uniformMatrix4fv(this._uPMatrixDraw, gl.FALSE, this.core.mat);
        }

        if (this._uZNearDraw) {
            gl.uniform1f(this._uZNearDraw, this.core.optics.near);
        }

        if (this._uZFarDraw) {
            gl.uniform1f(this._uZFarDraw, this.core.optics.far);
        }

        frameCtx.cameraMat = this.core.mat; // Query only in draw pass
    },


    pick : function(frameCtx) {

        var gl = this.program.gl;

        if (this._uPMatrixPick) {
            gl.uniformMatrix4fv(this._uPMatrixPick, gl.FALSE, this.core.mat);
        }

        if (frameCtx.rayPick) { // Z-pick pass: feed near and far clip planes into shader

            if (this._uZNearPick) {
                gl.uniform1f(this._uZNearPick, this.core.optics.near);
            }

            if (this._uZFarPick) {
                gl.uniform1f(this._uZFarPick, this.core.optics.far);
            }
        }

        frameCtx.cameraMat = this.core.mat; // Query only in draw pass
    }
});