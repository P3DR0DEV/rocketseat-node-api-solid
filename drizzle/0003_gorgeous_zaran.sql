CREATE INDEX "user_id_idx" ON "check_ins" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "gym_id_idx" ON "check_ins" USING btree ("gym_id");--> statement-breakpoint
CREATE INDEX "user_gym_idx" ON "check_ins" USING btree ("user_id","gym_id");